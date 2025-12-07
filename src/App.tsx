import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/Home";
import TrackingPage from "@/pages/Tracking";
export default function App() { return (<Router><Routes><Route path="/" element={<HomePage />} /><Route path="/track/:shipmentId" element={<TrackingPage />} /></Routes></Router>); }
