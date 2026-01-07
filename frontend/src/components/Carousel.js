// import React from 'react';
// import { Carousel } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function CarouselComponent() {
//   const imageStyle = {
//     height: '500px',
//     objectFit: 'cover',
//   };

//   const captionStyle = {
//     position: 'absolute',
//     right: '80px',
//     textAlign: 'left',
//     top: '170px',
//     paddingLeft: '10px',
//     paddingRight: '20px',
//   };

//   return (
//     <Carousel controls={true} indicators={true}>
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="https://img.freepik.com/free-photo/human-helix-dna-structure-concept-blue-color_90220-1399.jpg?ga=GA1.1.1730632680.1720676583&semt=ais_hybrid&w=900"
//           alt="Deep Learning in Mitosis Detection"
//           style={imageStyle}
//         />
//         <Carousel.Caption style={captionStyle}>
//           <h5>Deep Learning in Mitosis Detection</h5>
//           <p>AI-powered mitosis recognition for uterine leiomyosarcoma histopathology.</p>
//           <Link to="/detect" className="btn btn-primary">Diagnose Image</Link>
//         </Carousel.Caption>
//       </Carousel.Item>

//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="https://img.freepik.com/premium-photo/x-chromosomes_151689-406.jpg?ga=GA1.1.1730632680.1720676583&semt=ais_hybrid&w=900"
//           alt="Uterine Leiomyosarcoma Dataset"
//           style={imageStyle}
//         />
//         <Carousel.Caption style={captionStyle}>
//           <h5>Uterine Leiomyosarcoma Dataset</h5>
//           <p>Introducing a novel dataset for mitosis recognition and model training.</p>
//           <Link to="/detect" className="btn btn-primary">Diagnose Image</Link>
//         </Carousel.Caption>
//       </Carousel.Item>

//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//          src="https://img.freepik.com/free-photo/dna-closely_1048-2632.jpg?ga=GA1.1.1730632680.1720676583&semt=ais_hybrid&w=900"
//           alt="AI in Histopathology"
//           style={imageStyle}
//         />
//         <Carousel.Caption style={captionStyle}>
//           <h5>AI in Histopathology</h5>
//           <p>Enhancing cancer diagnostics with advanced deep learning models.</p>
//           <Link to="/detect" className="btn btn-primary">Diagnose Image</Link>
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>
//   );
// }

// export default CarouselComponent;

//2nd Design
import React from 'react';
import { Carousel as BootstrapCarousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Carousel.css'; // Import the custom CSS

function Carousel() {
  return (
    <div className="carousel-container">
      <BootstrapCarousel controls indicators>
     
        <BootstrapCarousel.Item>
          <img
            className="d-block carousel-img"
            src="https://img.freepik.com/free-photo/human-helix-dna-structure-concept-blue-color_90220-1399.jpg?ga=GA1.1.1730632680.1720676583&semt=ais_hybrid&w=900"
            alt="Mitosis Detection"
          />
          <BootstrapCarousel.Caption className="carousel-caption">
            <h5>Mitosis Detection System</h5>
            <p>AI-powered detection of mitosis in uterine leiomyosarcoma using YOLO.</p>
            <Link to="/detect" className="btn btn-primary">Diagnose Image</Link>
          </BootstrapCarousel.Caption>
        </BootstrapCarousel.Item>


        <BootstrapCarousel.Item>
          <img
            className="d-block carousel-img"
            src="https://img.freepik.com/premium-photo/x-chromosomes_151689-406.jpg?ga=GA1.1.1730632680.1720676583&semt=ais_hybrid&w=900"
            alt="AI Technology"
          />
          <BootstrapCarousel.Caption className="carousel-caption">
            <h5>Advancing AI in Healthcare</h5>
            <p>Explore how deep learning transforms cancer diagnostics.</p>
            <Link to="/detect" className="btn btn-primary">Diagnose Image</Link>
          </BootstrapCarousel.Caption>
        </BootstrapCarousel.Item>

     
        <BootstrapCarousel.Item>
          <img
            className="d-block carousel-img"
            src="https://img.freepik.com/free-photo/dna-closely_1048-2632.jpg?ga=GA1.1.1730632680.1720676583&semt=ais_hybrid&w=900"
            alt="Future Innovations"
          />
          <BootstrapCarousel.Caption className="carousel-caption">
            <h5>NextGen Diagnostics</h5>
            <p>Revolutionizing histopathology with real-time AI-based analysis.</p>
            <Link to="/detect" className="btn btn-primary">Diagnose Image</Link>
          </BootstrapCarousel.Caption>
        </BootstrapCarousel.Item>
      </BootstrapCarousel>
    </div>
  );
}

export default Carousel;
