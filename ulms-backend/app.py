# import os
# import cv2
# import numpy as np
# from flask import Flask, request, jsonify, send_from_directory
# from flask_cors import CORS
# from ultralytics import YOLO

# app = Flask(__name__)
# CORS(app)

# UPLOAD_FOLDER = 'uploads'
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# # Load your fine-tuned segmentation model
# model = YOLO("ultralytics/yololln-seg/yolo_best_model.pt")

# @app.route('/detect', methods=['POST'])
# def detect():
#     # 1) Save incoming image
#     img_file   = request.files['image']
#     patient_id = request.form.get('id')
#     name       = request.form.get('name')
#     age        = request.form.get('age')

#     filename = img_file.filename
#     filepath = os.path.join(UPLOAD_FOLDER, filename)
#     img_file.save(filepath)

#     # 2) Read image via OpenCV
#     img0 = cv2.imread(filepath)
    
#     # 3) Run prediction with stricter filtering
#     results = model.predict(
#         source=img0,
#         conf=0.6,       # only keep detections ≥ 60% confidence
#         iou=0.5,        # NMS IoU threshold
#         max_det=10,     # at most 10 boxes per image
#         device=0        # or 'cpu' if no GPU
#     )

#     detections = []
#     annotated = img0.copy()
#     for result in results:
#         # .boxes.xyxy: [N×4], .boxes.conf, .boxes.cls
#         for box, conf, cls in zip(result.boxes.xyxy, result.boxes.conf, result.boxes.cls):
#             x1, y1, x2, y2 = map(int, box)
#             cls_id = int(cls)
#             label = model.names[cls_id]

#             # Append to JSON
#             detections.append({
#                 "class":       label,
#                 "confidence":  float(conf)
#             })

#             # Draw box + label
#             cv2.rectangle(annotated, (x1, y1), (x2, y2), (0, 255, 0), 2)
#             cv2.putText(
#                 annotated,
#                 f"{label} {conf:.2f}",
#                 (x1, y1 - 10),
#                 cv2.FONT_HERSHEY_SIMPLEX,
#                 0.5,
#                 (0, 255, 0),
#                 1
#             )

#         # If you still want masks, similar logic applies:
#         if hasattr(result, 'masks') and result.masks is not None:
#             for mask in result.masks.data:
#                 # Resize mask to original size
#                 mask_resized = cv2.resize(
#                     mask.cpu().numpy(),
#                     (img0.shape[1], img0.shape[0]),
#                     interpolation=cv2.INTER_NEAREST
#                 )
#                 colored_mask = np.zeros_like(img0)
#                 colored_mask[:, :, 1] = (mask_resized * 255).astype(np.uint8)
#                 annotated = cv2.addWeighted(annotated, 1.0, colored_mask, 0.5, 0)

#     # 4) Save and return annotated image + detections
#     output_filename = f"annotated_{filename}"
#     output_path = os.path.join(UPLOAD_FOLDER, output_filename)
#     cv2.imwrite(output_path, annotated)

#     return jsonify({
#         "patient_id": patient_id,
#         "name":       name,
#         "age":        age,
#         "annotated_image_url": f"/uploads/{output_filename}",
#         "detections": detections
#     })

# @app.route('/uploads/<filename>')
# def serve_image(filename):
#     return send_from_directory(UPLOAD_FOLDER, filename)

# if __name__ == '__main__':
#     # In production, remove debug=True and use a proper WSGI server!
#     app.run(host='0.0.0.0', port=5000, debug=True)


import os
import cv2
import numpy as np
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from ultralytics import YOLO
import torch

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# 1) Dynamically choose device
device = 'cuda:0' if torch.cuda.is_available() else 'cpu'

# 2) Load model and move to chosen device
model = YOLO("ultralytics/yololln-seg/last.pt")
model.to(device)

@app.route('/detect', methods=['POST'])
def detect():
    # Save incoming image
    img_file   = request.files['image']
    patient_id = request.form.get('id')
    name       = request.form.get('name')
    age        = request.form.get('age')

    filename = img_file.filename
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    img_file.save(filepath)

    # Read via OpenCV (BGR)
    img0 = cv2.imread(filepath)

    # Run prediction with the correct device
    results = model.predict(
        source=img0,
        device=device,  # <-- USE the computed device
        conf=0.6,
        iou=0.5,
        max_det=10
    )

    detections = []
    annotated = img0.copy()

    for result in results:
        # Boxes
        for box, conf, cls in zip(result.boxes.xyxy, result.boxes.conf, result.boxes.cls):
            x1, y1, x2, y2 = map(int, box)
            label = model.names[int(cls)]
            detections.append({"class": label, "confidence": float(conf)})
            cv2.rectangle(annotated, (x1, y1), (x2, y2), (0,255,0), 2)
            cv2.putText(annotated, f"{label} {conf:.2f}",
                        (x1, y1-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,255,0), 1)

        # Optional: masks
        if hasattr(result, 'masks') and result.masks is not None:
            for mask in result.masks.data:
                m = mask.cpu().numpy().astype(np.uint8)
                m = cv2.resize(m, (img0.shape[1], img0.shape[0]), interpolation=cv2.INTER_NEAREST)
                colored = np.zeros_like(img0); colored[:, :, 1] = m * 255
                annotated = cv2.addWeighted(annotated, 1.0, colored, 0.5, 0)

    # Save and respond
    out_name = f"annotated_{filename}"
    out_path = os.path.join(UPLOAD_FOLDER, out_name)
    cv2.imwrite(out_path, annotated)

    return jsonify({
        "patient_id": patient_id,
        "name":       name,
        "age":        age,
        "image":      f"/uploads/{out_name}",
        "detections": detections
    })

@app.route('/uploads/<filename>')
def serve_image(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

if __name__ == '__main__':
    app.run(debug=True)
