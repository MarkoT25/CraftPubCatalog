import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";
import { logoutUser } from "@/lib/auth.fetching";
import { toast } from "sonner";
import { 
  Beer, 
  Building2, 
  ShoppingCart, 
  Heart, 
  LogOut,
  Home,
  Plus,
  Settings
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  // Logout mutation
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

  // Navigation items
  const navigationItems = [
    { 
      title: "Home", 
      url: "/", 
      icon: Home 
    },
    { 
      title: "Beers", 
      url: "/beers", 
      icon: Beer 
    },
    { 
      title: "Breweries", 
      url: "/breweries", 
      icon: Building2 
    },
    { 
      title: "Cart", 
      url: "/cart", 
      icon: ShoppingCart 
    },
    { 
      title: "Favorites", 
      url: "/favorites", 
      icon: Heart 
    },
  ];

  // Admin items (only show for admin users)
  const adminItems = user?.role === 'admin' ? [
    { 
      title: "Add Beer", 
      url: "/admin/beers/create", 
      icon: Plus 
    },
    { 
      title: "Add Brewery", 
      url: "/admin/breweries/create", 
      icon: Plus 
    },
    { 
      title: "Manage", 
      url: "/admin", 
      icon: Settings 
    },
  ] : [];

  if (isAuthPage) {
    return (
      <div className="font-space">
        <main>
          <Outlet />
        </main>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="font-space">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center space-x-2 px-4 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Beer className="h-4 w-4" />
              </div>
              <span className="font-clash text-lg font-bold text-primary-600">
                Craft Beer Hub
              </span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            {/* Main Navigation */}
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => navigate(item.url)}
                        isActive={location.pathname === item.url}
                        className="w-full justify-start"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Admin Section */}
            {adminItems.length > 0 && (
              <>
                <Separator className="my-2" />
                <SidebarGroup>
                  <SidebarGroupLabel>Admin</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {adminItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            onClick={() => navigate(item.url)}
                            isActive={location.pathname === item.url}
                            className="w-full justify-start"
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            )}
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="px-2 py-2">
                  {/* User info */}
                  <div className="mb-3 px-2">
                    <p className="text-sm font-medium text-surface-900">
                      {user?.username || 'User'}
                    </p>
                    <p className="text-xs text-surface-500">
                      {user?.email}
                    </p>
                    {user?.role === 'admin' && (
                      <span className="inline-flex items-center rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-800 mt-1">
                        Admin
                      </span>
                    )}
                  </div>
                  
                  {/* Logout button */}
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                  </Button>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="font-space text-lg font-semibold text-surface-800">
              {navigationItems.find(item => item.url === location.pathname)?.title || 'Craft Beer Hub'}
            </h1>
          </header>
          <main className="p-6">
            <Outlet />
          </main>
          <Toaster />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

