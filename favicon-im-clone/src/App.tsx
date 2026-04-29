import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Domain from "@/pages/Domain";
import Generator from "@/pages/Generator";
import Home from "@/pages/Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/domain/:domain" element={<Domain />} />
        <Route path="/generator" element={<Generator />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}
