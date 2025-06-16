import { RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import { getUserId } from "./modules/auth/services/auth";

const router = createRouter({ routeTree, context: getUserId });

function App() {
  return <RouterProvider router={router} />;
}

export default App;
