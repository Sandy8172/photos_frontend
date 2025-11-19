// custom hook to check auth status and session timeout---

"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated, logout } from "../utils/auth";

export default function useAuthCheck() {
  const router = useRouter();
  const pathname = usePathname();

  // creating idle timer for session timeout countdown -----------
  const idleTimer = useRef(null);

  // function to reset the timer , if not triggered within 2 min. then it will logout the user----------
  function resetIdleTimer() {
    if (idleTimer.current) clearTimeout(idleTimer.current);

    // Setting idle timeout to 2 minutes--------
    idleTimer.current = setTimeout(() => {
      logout(); // clears token + redirect to login page
      alert("You have been signed out due to inactivity.");
    }, 2 * 60 * 1000);
  }

  useEffect(() => {
    const publicRoutes = ["/sign-in", "/sign-up"];

    // condition to Protect private routes----------
    if (!publicRoutes.includes(pathname)) {
      if (!isAuthenticated()) {
        logout();
        return;
      }
    }

    //  activity listeners, --- if any of these listener triggers then it will reset the time again to 2 mins---------
    const events = ["click", "mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetIdleTimer));

    // Starting timer immediately after logging in or pathchange----------
    resetIdleTimer();

    // Cleanup function to prevent overload or memory leak----------------
    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, resetIdleTimer)
      );
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [pathname]);
}
