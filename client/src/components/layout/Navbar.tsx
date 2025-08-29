import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./ModeToggle";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { role } from "@/constants/role";
import { Menu, X } from "lucide-react";
import toast from 'react-hot-toast';
import { useState } from "react";

const navigationLinks = [
  { href: "/", label: "Home", role: "Publish" },
  { href: "/about", label: "About", role: "Publish" },
  { href: "/contact", label: "Contact Us", role: "Publish" },
  { href: "/admin", label: "Dashboard", role: role.Admin },
  { href: "/sender", label: "Dashboard", role: role.Sender },
  { href: "/receiver", label: "Dashboard", role: role.Receiver },
];

export default function Navbar() {
  const { data: userData } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
      navigate("/login");
      toast.success("Successfully logged out.");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const userRole = userData?.data?.role;
  const isLoggedIn = !!userRole;

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const filteredLinks = navigationLinks.filter(
    (link) => link.role === "Publish" || link.role === userRole
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-white/70 via-gray-50/80 to-blue-50/80 dark:from-gray-950/80 dark:to-blue-950/90 backdrop-blur-md shadow-sm px-2 md:px-6">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4">
        {/* Logo & navigation */}
        <div className="flex items-center gap-4">
          {/* Mobile menu trigger */}
          <Popover open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <PopoverTrigger asChild>
              <Button
                className="group size-9 md:hidden"
                variant="ghost"
                size="icon"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <Menu className={`h-6 w-6 ${mobileMenuOpen ? "hidden" : "block"} transition-all`} />
                <X className={`h-6 w-6 ${mobileMenuOpen ? "block" : "hidden"} transition-all`} />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[200px] p-0 md:hidden">
              <nav>
                <ul className="flex flex-col gap-1">
                  {filteredLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.href}
                        className={`block px-4 py-2 rounded-lg font-medium transition-all ${
                          isLinkActive(link.href)
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                            : "hover:bg-blue-50 dark:hover:bg-blue-950/40 text-gray-700 dark:text-gray-200"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex flex-col gap-2 p-4 border-t mt-2">
                {isLoggedIn ? (
                  <>
                    <Button asChild size="sm" className="w-full">
                      <Link to={`/${userRole}/myprofile`}>My Profile</Link>
                    </Button>
                    <Button onClick={handleLogout} size="sm" className="w-full">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="ghost" size="sm" className="w-full">
                      <Link to="/login">Sign In</Link>
                    </Button>
                    <Button asChild size="sm" className="w-full">
                      <Link to="/register">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </PopoverContent>
          </Popover>
          <Link to={"/"} className="flex items-center gap-2">
            {/* Modern logo style */}
            <span className="rounded-full bg-gradient-to-br from-orange-400 via-yellow-300 to-blue-400 p-1">
              <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
                <path d="M30 28V12C30 10.8954 29.1046 10 28 10H27.8994C27.369 10 26.8604 10.2109 26.4854 10.5859L10.5859 26.4854C10.2109 26.8604 10 27.369 10 27.8994V40H0V27.8994C2.15312e-05 24.7168 1.26423 21.6645 3.51465 19.4141L19.4141 3.51465C21.6645 1.26423 24.7168 2.1373e-05 27.8994 0H28C34.6274 0 40 5.37258 40 12V28C40 34.6274 34.6274 40 28 40H14V30H28C29.1046 30 30 29.1046 30 28Z M0 0H17L7 10H0V0Z" fill="#FF4D00"></path>
              </svg>
            </span>
            <span className="font-bold text-xl md:text-2xl tracking-tight bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent dark:from-blue-300 dark:to-blue-500">
              Logisti Core
            </span>
          </Link>
          {/* Desktop navigation */}
          <NavigationMenu className="max-md:hidden ml-8">
            <NavigationMenuList className="gap-2">
              {filteredLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    asChild
                    active={isLinkActive(link.href)}
                    className={`px-3 py-2 rounded-lg font-medium transition-all ${
                      isLinkActive(link.href)
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                        : "text-muted-foreground hover:bg-blue-50 dark:text-gray-200 dark:hover:bg-blue-950/40"
                    }`}
                  >
                    <Link to={link.href}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Button asChild size="sm" className="max-md:hidden text-sm">
                <Link to={`/${userRole}/myprofile`}>My Profile</Link>
              </Button>
              <Button onClick={handleLogout} size="sm" className="text-sm">
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="text-sm">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="text-sm">
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}