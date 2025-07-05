import { RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

const router = createRouter({ 
  routeTree,
  context: {
    queryClient: undefined!, // We'll provide this in the component
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const queryClient = useQueryClient();

  return <RouterProvider router={router} context={{ queryClient }} />;
}

export default App;
