// // InfoCards.js
// import React from 'react';
// import '../styles/InfoCards.css';

// function InfoCards() {
//   return (
//     <div className="container info-cards-section">
//       <div className="row text-center">
//         <div className="col-md-4">
//           <div className="info-card">
//             <h3>Mitosis Recognition</h3>
//             <p>
//               Leveraging YOLOv5 for real-time mitosis detection in uterine leiomyosarcoma histopathology.
//             </p>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="info-card">
//             <h3>Dataset Details</h3>
//             <p>
//               A custom mitosis dataset with annotated histopathological images to enhance detection accuracy.
//             </p>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="info-card">
//             <h3>Model Training</h3>
//             <p>Using YOLOv5 for precise mitotic cell localization and classification.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default InfoCards;



// InfoCards.js 2nd Design
import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import '../styles/InfoCards.css';

const cards = [
  {
    title: 'Mitosis Recognition',
    text: 'Performs both detection and segmentation of mitotic figures using the YOLOv11n model to enhance accuracy in cancer diagnosis.',
    icon: '🧬',
  },
  {
    title: 'Dataset Details',
    text: 'Includes 150 annotated histopathological images of ULMS, split into training, validation, and test sets with pixel-level segmentation masks.',
    icon: '📂',
  },
  {
    title: 'Model Training',
    text: 'YOLOv11n segmentation model trained on augmented datasets with performance evaluated using precision, recall, and mAP.',
    icon: '⚙️',
  },
];

export default function InfoCards() {
  return (
    <Container className="info-cards mt-5">
      <Row className="g-4">
        {cards.map((card, idx) => (
          <Col key={idx} md={4}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-100 text-center shadow-sm border-3" style={{ backgroundColor: '#e0f7ff' }}>
                <Card.Body>
                  <div className="icon-circle mb-3">{card.icon}</div>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.text}</Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
