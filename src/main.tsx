import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
// import { Buffer } from "buffer";

// (window as any).Buffer = Buffer;

createRoot(document.getElementById("root")!).render(
  <TonConnectUIProvider manifestUrl="https://teal-big-falcon-529.mypinata.cloud/files/bafkreiayhequh5wlinfj2nq7apdm5pzyxe2ss7dy4agzvmyc5hr5vu2t6m?X-Algorithm=PINATA1&X-Date=1738516918&X-Expires=30&X-Method=GET&X-Signature=e96b6605928c613587012a7b13964a8c2db8135b69a7811e63e9774485115d26">
    <App />
  </TonConnectUIProvider>
);
