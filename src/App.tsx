import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Instructors from './pages/Instructors';
import InstructorProfile from './pages/InstructorProfile';
import SchedulePage from './pages/SchedulePage';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Instructors />} />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="/instructors/:slug" element={<InstructorProfile />} />
        <Route path="/instructors/:slug/schedule" element={<SchedulePage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;
