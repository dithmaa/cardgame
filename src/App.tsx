import "./App.scss";
import { GamePage, HomePage, RatingPage, EarnPage, WalletPage } from "./pages";
import { BrowserRouter as Router, Route, Routes } from "react-router";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/top" element={<RatingPage />} />
          <Route path="/earn" element={<EarnPage />} />
          <Route path="/wallet" element={<WalletPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
