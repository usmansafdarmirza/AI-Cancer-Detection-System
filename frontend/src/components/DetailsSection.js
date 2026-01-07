import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { motion } from 'framer-motion';
import '../styles/DetailsSection.css';

export default function DetailsSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container className="details-section py-5">
      <motion.h2
        className="details-heading text-center mb-5"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Mitosis Recognition Model Details
      </motion.h2>

      {/* Graphs section */}
      <Row className="g-4 mb-5">
        {['Training Loss Over Epoch', 'Precision, Recall'].map((graphTitle, idx) => (
          <Col key={idx} md={6}>
            <motion.div
              initial={{ opacity: 0, x: idx === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="shadow-sm border-2 detail-card">
                <Card.Body>
                  <Card.Title className="text-center mb-3">{graphTitle}</Card.Title>
                  {/* Dynamically load different images for each graph */}
                  {idx === 0 ? (
                    <img
                      src={`training_losses.png`}  
                      alt="Training Accuracy & Loss"
                      className="img-fluid graph-image" // Updated class for styling
                    />
                  ) : (
                    <img
                      src={`precision_recall_curve.png`}  
                      alt="Precision, Recall, F1-Score"
                      className="img-fluid graph-image" // Updated class for styling
                    />
                  )}
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Detail cards */}
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Row className="g-4">
            {/* Performance Metrics */}
            <Col md={4}>
              <Card className="h-100 text-center shadow-sm border-3 detail-card">
                <Card.Body>
                  <Card.Title>Performance Metrics</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="custom-list-group-item">Precision: 94.8%</ListGroup.Item>
                    <ListGroup.Item className="custom-list-group-item">Recall: 93.6%</ListGroup.Item>
                    <ListGroup.Item className="custom-list-group-item">F1-Score: 94.2%</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>

            {/* Slide Preparation & Imaging Process */}
            <Col md={4}>
              <Card className="h-100 text-center shadow-sm border-3 detail-card">
                <Card.Body>
                  <Card.Title>Slide Preparation & Imaging Process</Card.Title>
                  <Card.Text className="card-text-muted">
                    Tissue samples are collected via biopsy and fixed in formalin to preserve cellular structure.
                    They are embedded in paraffin, thinly sliced, and stained with hematoxylin and eosin (H&E).
                    The prepared slides are scanned using high-resolution digital microscopy to produce detailed images.
                    These serve as the input for mitosis segmentation and pixel-level annotation.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Key Observations */}
            <Col md={4}>
              <Card className="h-100 text-center shadow-sm border-3 detail-card">
                <Card.Body>
                  <Card.Title>Key Observations</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="custom-list-group-item">YOLOv11n excels on clustered mitoses, reducing overlap errors.</ListGroup.Item>
                    <ListGroup.Item className="custom-list-group-item">Post-processing NMS tuning cut false positives by 20%.</ListGroup.Item>
                    <ListGroup.Item className="custom-list-group-item">Segmentation masks improved boundary precision over boxes alone.</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </motion.div>
      )}
    </Container>
  );
}
