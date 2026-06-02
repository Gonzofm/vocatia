import FloatingWhatsApp from "./components/FloatingWhatsApp";
import { useState } from "react";
import CheckoutModal from "./components/CheckoutModal";
import Landing from "./pages/landing";
import PaymentStatus from "./pages/paymentStatus";
import Test from "./pages/test";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const path = window.location.pathname;

    if (path === "/payment/success") return "payment-success";
    if (path === "/payment/rejected") return "payment-rejected";
    if (path === "/payment/pending") return "payment-pending";

    return "landing";
  });
  const [latestResult, setLatestResult] = useState(null);
  const [premiumActive, setPremiumActive] = useState(
    () => localStorage.getItem("vocatiaPremiumActive") === "true"
  );
  const [premiumLead, setPremiumLead] = useState(() => {
    const storedLead = localStorage.getItem("vocatiaLead");
    return storedLead ? JSON.parse(storedLead) : null;
  });

  const goToLanding = () => {
    window.history.pushState({}, "", "/");
    setCurrentPage("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToTest = () => {
    window.history.pushState({}, "", "/");
    setCurrentPage("test");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activatePremium = (lead) => {
    localStorage.setItem("vocatiaPremiumActive", "true");
    localStorage.setItem("vocatiaLead", JSON.stringify(lead));
    setPremiumActive(true);
    setPremiumLead(lead);
  };

  const goToCheckout = () => {
    window.history.pushState({}, "", "/checkout");
    setCurrentPage("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar onStart={goToTest} onHome={goToLanding} />

      {currentPage.startsWith("payment-") ? (
        <PaymentStatus
          status={currentPage.replace("payment-", "")}
          onHome={goToTest}
          onRetry={goToCheckout}
          onUnlock={activatePremium}
        />
      ) : currentPage === "checkout" ? (
        <CheckoutModal
          isOpen
          asPage
          result={latestResult}
          onClose={goToTest}
        />
      ) : currentPage === "test" ? (
        <Test
          premiumUnlocked={premiumActive}
          premiumLead={premiumLead}
          onUnlockPremium={goToCheckout}
          onResultReady={setLatestResult}
        />
      ) : (
        <Landing onStart={goToTest} />
      )}

      <FloatingWhatsApp />
      <Footer />
    </>
  );
}

export default App;
