import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Empty from "./pages/Empty";
import Sample from "./pages/Sample";
import Documentation from "./pages/Documentation";
import DocumentationLayout from "./components/layouts/DocumentationLayout";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Applayout />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "documentation",
          element: <DocumentationLayout />,
          children: [
            {
              path: "",
              element: <Documentation />,
            },
            {
              path: "sample",
              element: <Sample />,
            },
          ],
        },
        {
          path: "empty",
          element: <Empty />,
        },
      ],
    },
    {
      path: "*",
      element: <NoMatch />,
    },
  ],
  {
    basename: global.basename,
  }
);
