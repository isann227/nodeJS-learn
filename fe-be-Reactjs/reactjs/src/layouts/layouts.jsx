import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layouts() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar fixed */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Konten */}
      <main className="flex-1 container mx-auto px-4 pt-20 pb-10">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
