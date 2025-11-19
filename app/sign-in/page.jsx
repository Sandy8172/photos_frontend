// sign-in page with validation and session creation -----------------


"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { generateToken } from "../utils/jwt";
import { setSession } from "../utils/auth";

import { isAuthenticated } from "../utils/auth";

// defining static user ----------------
const VALID_USER = {
  username: "admin",
  password: "Admin@123456",
};

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  //  Redirecting to home if already authenticated-------------
  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/home");
    }
  }, [router]);

  // handeling login function and adding validation -----------

  const handleLogin = (e) => {
    e.preventDefault();

    // --- Validation ---
    if (!username.trim()) {
      return setErrorMsg("Username is required.");
    }
    if (!password.trim()) {
      return setErrorMsg("Password is required.");
    }

    // --- Static Auth Check ---
    if (username === VALID_USER.username && password === VALID_USER.password) {
      const token = generateToken({ username });
      setSession(token);
      setErrorMsg("");

      // redirecting--------
      router.push("/home");
      return;
    }
    setErrorMsg("Invalid username or password.");
  };

  return (
    <div className="flex flex-col h-fit mt-28 items-center">
      <Card className="w-full max-w-76 md:max-w-lg">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your cradentials below to login to your account
          </CardDescription>
          <CardAction>
            <Button asChild variant={"outline"}>
              <Link className="font-semibold" href={"/sign-up"}>
                Sign Up
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {/* Error message */}
              {errorMsg && (
                <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
              )}
              <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </CardFooter>
            </div>
          </form>
        </CardContent>
      </Card>
      <p className="mt-5 text-center">username: admin, password: Admin@123456,</p>
    </div>
  );
};

export default LoginPage;
