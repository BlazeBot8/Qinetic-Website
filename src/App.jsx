import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactEmailPage from "./pages/ContactEmailPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact/email" element={<ContactEmailPage />} />
    </Routes>
  );
}
