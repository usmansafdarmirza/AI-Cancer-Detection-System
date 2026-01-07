// import React from 'react';
// import Navbar from './components/Navbar';
// import Carousel from './components/Carousel';
// import InfoCards from './components/InfoCards';
// import DetailsSection from './components/DetailsSection';
// import Detect from './components/Detect';
// import Result from './components/Result';
// import Save from './components/Save';  // Import Save.js
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Navbar />
//         <Routes>
//   <Route path="/" element={<><Carousel /><InfoCards /><DetailsSection /></>} />
//   <Route path="/detect" element={<Detect />} />
//   <Route path="/result" element={<Result />} />
//   <Route path="/save" element={<Save />} />  {/* Ensure Save Page is routed */}
// </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;



import React from 'react';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import InfoCards from './components/InfoCards';
import DetailsSection from './components/DetailsSection';
import Detect from './components/Detect';
import Result from './components/Save';
import Save from './components/Result';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function Home() {
  return (
    <>
      <Carousel />
      <InfoCards />
      <DetailsSection />  {/* Ensure it's inside the home component */}
    </>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detect" element={<Detect />} />
          <Route path="/save" element={<Result />} />
          <Route path="/result" element={<Save />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;








