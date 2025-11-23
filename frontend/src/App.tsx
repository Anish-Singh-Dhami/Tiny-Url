import { createBrowserRouter, RouterProvider } from "react-router";
import { Applayout } from "./layouts/Applayout";
import { RedirectPage } from "./pages/redirect.page";
import { HealthPage } from "./pages/health.page";
import { Toaster } from "sonner";
import { DashboardPage } from "./pages/dashboard.page";
import { StatsPage } from "./pages/stats.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "code/:code",
        element: <StatsPage />,
      },
      {
        path: "/:code",
        element: <RedirectPage />,
      },
      {
        path: "/healthz",
        element: <HealthPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" closeButton richColors />
    </>
  );
}

export default App;
