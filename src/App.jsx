import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import RequireAuth from "./auth/RequireAuth";

import SignIn from "./pages/SignIn";
import Dashboard from "./components/Dashboard";
import Broadcast from "./components/Broadcast";
import Reports from "./components/Reports";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<SignIn />} />

        {/* Protected */}
        <Route
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/broadcast" element={<Broadcast />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
