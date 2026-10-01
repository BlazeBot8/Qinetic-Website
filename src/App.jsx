import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactEmailPage from "./pages/ContactEmailPage";
import LearnPage from "./pages/LearnPage";
import ModulePage from "./pages/ModulePage";
import FinalPage from "./pages/FinalPage";
import ProfilePage from "./pages/ProfilePage";
import CertificatePage from "./pages/CertificatePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact/email" element={<ContactEmailPage />} />
      <Route path="/learn" element={<LearnPage />} />
      <Route path="/learn/module/:n" element={<ModulePage />} />
      <Route path="/learn/final" element={<FinalPage />} />
      <Route path="/learn/me" element={<ProfilePage />} />
      <Route path="/certificate/:code" element={<CertificatePage />} />
    </Routes>
  );
}
