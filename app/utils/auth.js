// auth utilities, creating functions to use session and token properties

import Cookies from "js-cookie";
import { verifyToken } from "./jwt";

// Saving token in cookie----
export function setSession(token) {
  Cookies.set("token", token, {
    expires: 1, // 1 day
    secure: true, // only HTTPS
    sameSite: "strict", // protect from CSRF
  });
}

// Getting token from cookie----------
export function getSession() {
  return Cookies.get("token");
}

// Logout function
export function logout() {
  Cookies.remove("token");
  window.location.href = "/sign-in";
}

// Authentication function -----------
export function isAuthenticated() {
  const token = getSession();
  if (!token) return false;

  const result = verifyToken(token);
  return result.valid && !result.expired;
}

// Extracting username to display on UI
export function getUsernameFromToken() {
  const token = getSession();
  if (!token) return null;
  try {
    const data = JSON.parse(atob(token));
    return data.username || null;
  } catch {
    return null;
  }
}
