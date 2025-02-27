import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalProvider } from "./GlobalContext";
import AuthProvider from "./AuthContext";
import "./styles.css"

const queryClient = new QueryClient(); 

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> 
      <BrowserRouter>
        <GlobalProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </GlobalProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
