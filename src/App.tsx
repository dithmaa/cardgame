import "./App.scss";
import { GamePage, HomePage, RatingPage, EarnPage, WalletPage } from "./pages";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { WalletProvider } from "./shared/context/WalletContext";

function App() {
  return (
    <div className="App">
      <WalletProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/top" element={<RatingPage />} />
            <Route path="/earn" element={<EarnPage />} />
            <Route path="/wallet" element={<WalletPage />} />
          </Routes>
        </Router>
      </WalletProvider>
    </div>
  );
}

export default App;
