import { usePathname } from "next/navigation";

// Pages where navigation should be hidden
const HIDDEN_NAVIGATION_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/admin",
  "/auth",
  // Add more paths as needed
];

export function useNavigationVisibility() {
  const pathname = usePathname();

  // Check if navigation should be hidden
  const shouldHideNavigation = HIDDEN_NAVIGATION_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  return {
    shouldShowNavigation: !shouldHideNavigation,
    currentPath: pathname,
    isAuthPage:
      pathname.startsWith("/login") ||
      pathname.startsWith("/register") ||
      pathname.startsWith("/forgot-password"),
    isAdminPage: pathname.startsWith("/admin"),
  };
}
