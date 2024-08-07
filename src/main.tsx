import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider, Switch } from "antd";
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import FormPage from "./pages/FormPage.tsx";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
    },
  },
});
const pageVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? "100vw" : "-100vw",
  }),
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? "100vw" : "-100vw",
  }),
};
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBorderColor: "#9E9E9E",
            primaryColor: "#fff",
            colorPrimaryBg: "#624DE3",
          },
          Input: {
            borderRadius: 8,
            colorBorder: "#9E9E9E",
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AnimatePresence>
            <AppRoutes />
          </AnimatePresence>
        </BrowserRouter>
      </QueryClientProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </ConfigProvider>
  </React.StrictMode>
);
function AppRoutes() {
  const location = useLocation();
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigation = () => {
      // Determine navigation direction
      setDirection(navigate.length - window.history.length);
    };

    window.addEventListener("popstate", handleNavigation);
    return () => {
      window.removeEventListener("popstate", handleNavigation);
    };
  }, [navigate]);
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <App />
            </motion.div>
          }
        />
        <Route
          path="add-user"
          element={
            <motion.div
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="formWrapper"
            >
              <FormPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
