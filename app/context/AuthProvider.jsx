// auth provider which runs globaly to check auth status if user logged in or not all the protected routes goes throw here---------------

"use client";
import useAuthCheck from "@/app/hooks/useAuthCheck";

export default function AuthProvider({ children }) {
  useAuthCheck(); // runs globally---- using this useAuth function to check auth status
  return <>{children}</>;
}
