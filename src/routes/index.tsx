import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  // Mock: jump straight to the dashboard. Swap to "/auth" to test the auth flow.
  return <Navigate to="/dashboard" />;
}
