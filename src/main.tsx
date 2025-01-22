import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
// import { Buffer } from "buffer";

// (window as any).Buffer = Buffer;

createRoot(document.getElementById("root")!).render(
  <TonConnectUIProvider manifestUrl="https://teal-big-falcon-529.mypinata.cloud/files/bafkreid5vqslewk7mjpwoyjx64djwoepzddavrjuslsdhyvbirioq53vi4?X-Algorithm=PINATA1&X-Date=1737561775&X-Expires=30&X-Method=GET&X-Signature=a62f73fd941e4d2a63cafb00906197be2b3c5c5bbe680fbe9870e052304e743a">
    <App />
  </TonConnectUIProvider>
);
