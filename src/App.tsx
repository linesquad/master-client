import { RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { createRouter } from "@tanstack/react-router";

const router = createRouter({ routeTree });

function App() {
  return <RouterProvider router={router} />;
}

export default App;
