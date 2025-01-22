import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
// import { Buffer } from "buffer";

// (window as any).Buffer = Buffer;

createRoot(document.getElementById("root")!).render(
  <TonConnectUIProvider manifestUrl="https://teal-big-falcon-529.mypinata.cloud/files/bafkreid5vqslewk7mjpwoyjx64djwoepzddavrjuslsdhyvbirioq53vi4?X-Algorithm=PINATA1&X-Date=1737533788&X-Expires=30&X-Method=GET&X-Signature=b49f6617dde6dfe0cd5ea1e0627470b68d5684fa9e70277440b8c327619283ae">
    <App />
  </TonConnectUIProvider>
);
