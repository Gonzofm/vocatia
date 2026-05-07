import FloatingWhatsApp from "./components/FloatingWhatsApp";
import { useState } from "react";
import Landing from "./pages/landing";
import Test from "./pages/test";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [currentPage, setCurrentPage] = useState("landing");

  const goToLanding = () => {
    setCurrentPage("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToTest = () => {
    setCurrentPage("test");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar onStart={goToTest} onHome={goToLanding} />

      {currentPage === "test" ? (
        <Test />
      ) : (
        <Landing onStart={goToTest} />
      )}
<FloatingWhatsApp />
      <Footer />
    </>
  );
}

export default App;