import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import UploadPage from "./components/UploadPage";
import QuotePage from "./components/QuotePage";
import FindCenterPage from "./components/FindCenterPage"; // Ensure you have this component created for finding repair centers

import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/find-center" element={<FindCenterPage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/upload-damage" element={<UploadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
