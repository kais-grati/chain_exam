import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "@radix-ui/themes/styles.css";
import { ConnectButton, SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import "@mysten/dapp-kit/dist/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@radix-ui/themes";
import App from "./UX/App.tsx";
import { networkConfig } from "./UX/networkConfig.ts";

import "./main.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme appearance="light">
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
          <WalletProvider autoConnect>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </Theme>
  </React.StrictMode>,
);
