import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
// import { Buffer } from "buffer";

// (window as any).Buffer = Buffer;

createRoot(document.getElementById("root")!).render(
  <TonConnectUIProvider manifestUrl="https://teal-big-falcon-529.mypinata.cloud/files/bafkreiczltcgyz24xfddatblru3fujxf74sw7at44dnsvdv37mwa2mnb2e?X-Algorithm=PINATA1&X-Date=1737561920&X-Expires=30&X-Method=GET&X-Signature=fbe26475133c6dc3174dc4c2ce06fe931f98fcf495e64a07800e39a239dfc1d7">
    <App />
  </TonConnectUIProvider>
);
