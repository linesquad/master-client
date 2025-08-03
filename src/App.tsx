import { RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import { getUser } from "./modules/auth/services/auth";

const router = createRouter({
  routeTree,
  context: {
    getUser: getUser,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} context={{ getUser }} />;
}

export default App;
