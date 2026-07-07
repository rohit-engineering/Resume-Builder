import { useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function MainLayout({ children }) {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <div className="flex min-h-screen flex-col">
      {isHomePage && <Navbar />}

      <main className="flex-grow">
        {children}
      </main>

      {isHomePage && <Footer />}
    </div>
  );
}

export default MainLayout;