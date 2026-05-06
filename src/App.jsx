import { useState } from "react";
import Landing from "./pages/landing";
import Test from "./pages/test";

function App() {
  const [showTest, setShowTest] = useState(false);

  return showTest ? <Test /> : <Landing onStart={() => setShowTest(true)} />;
}

export default App;