import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/auth-context";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface MobileDropdownMenuProps {
  handleLogout: () => void;
  options: { label: string; href: string }[];
  isLogoutButtonDisabled: boolean;
}

export const MobileDropdownMenu = ({
  handleLogout,
  options,
  isLogoutButtonDisabled,
}: MobileDropdownMenuProps) => {
  const { user } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex md:hidden items-center justify-center gap-2">
          <HiOutlineMenuAlt2 className="size-7 text-black cursor-pointer" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.username || "My Account"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuItem key={option.href} asChild>
            <Link to={option.href}>{option.label}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <div className="w-full flex items-center justify-center">
          <Button
            variant="destructive"
            onClick={handleLogout}
            disabled={isLogoutButtonDisabled}
            className="bg-primary-600 hover:bg-primary-500 text-sm text-white font-semibold cursor-pointer py-3 transition-colors duration-300"
          >
            Logout
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
