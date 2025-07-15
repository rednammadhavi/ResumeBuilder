import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ResumeBuilder from "./pages/ResumeBuilder";
import PDFDownload from "./pages/PDFDownload";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build" element={<ResumeBuilder />} />
        <Route path="/download" element={<PDFDownload />} />
      </Routes>
    </BrowserRouter>
  );
}