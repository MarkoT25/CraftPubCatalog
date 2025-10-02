import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/NavigationBar/Navbar";

export default function MainLayout() {
  const location = useLocation();
  const isNavbarVisible =
    location.pathname !== "/login" && location.pathname !== "/register";
  return (
    <div className="font-space">
      {isNavbarVisible && <Navbar />}
      <main>
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}
