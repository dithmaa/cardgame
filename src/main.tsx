import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
// import { Buffer } from "buffer";

// (window as any).Buffer = Buffer;

createRoot(document.getElementById("root")!).render(
  <TonConnectUIProvider manifestUrl="https://teal-big-falcon-529.mypinata.cloud/files/bafkreigsolrp2lhizkovc563qgt7dpbwbrm4jvpchbg4o7dodnk6d4b3im?X-Algorithm=PINATA1&X-Date=1738516727&X-Expires=30&X-Method=GET&X-Signature=f70e5441150be4f0b65aa0ba82d84514e71c346cafb53aaf61024cd321909f95">
    <App />
  </TonConnectUIProvider>
);
