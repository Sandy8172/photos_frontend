// layout for protected routes wraped with authProvider to prevent unaurthorized user

"use client";
import AuthProvider from "../context/AuthProvider";

export default function ProtectedLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
