import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";
import { logoutUser } from "@/lib/auth.fetching";
import { toast } from "sonner";
import { Link, useLocation } from "react-router-dom";
import { MobileDropdownMenu } from "./MobileDropdownMenu";

const options = [
  { label: "Beers", href: "beers" },
  { label: "Breweries", href: "breweries" },
  { label: "Cart", href: "cart" },
  { label: "Favorites", href: "favorites" },
];

export const Navbar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const logoutMutation = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      logout();
      toast.success("Logged out successfully");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="w-full flex justify-between items-center px-4 py-3 border-b border-black/10">
      <div>
        <h1 className="text-primary-600 font-semibold text-3xl">
          Craft Beer Catalog
        </h1>
      </div>
      <div className="hidden md:flex items-center justify-center gap-2 lg:gap-4">
        <div className="flex items-center justify-center gap-2 lg:gap-4">
          {options.map((option) => (
            <Link
              key={`/${option.label}`}
              to={option.href}
              className={`text-md text-secondary-950 hover:text-primary-600 font-semibold cursor-pointer py-2 px-4 transition-colors duration-300 ${
                location.pathname === `/${option.href}` &&
                "border-b-2 border-primary-600"
              }`}
            >
              {option.label}
            </Link>
          ))}
        </div>
        <Button
          variant="destructive"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="bg-primary-600 hover:bg-primary-500 text-md text-white font-semibold cursor-pointer py-5 transition-colors duration-300"
        >
          Logout
        </Button>
      </div>

      <MobileDropdownMenu
        handleLogout={handleLogout}
        options={options}
        isLogoutButtonDisabled={logoutMutation.isPending}
      />
    </div>
  );
};
