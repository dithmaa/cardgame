import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <TonConnectUIProvider manifestUrl="https://teal-big-falcon-529.mypinata.cloud/files/bafkreihjzcj63nw4akkz76ddfbtptuf7amntoasaiacnrbsc6ethjdbjwy?X-Algorithm=PINATA1&X-Date=1737532189&X-Expires=30&X-Method=GET&X-Signature=0c2aabbd3a942d061f800d4c63a6138d037e1176281a663943307665c59d3256">
    <App />
  </TonConnectUIProvider>
);
