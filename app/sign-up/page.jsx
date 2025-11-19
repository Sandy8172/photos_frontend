// sign-up(register) page to create user and directely redirects to home after successfully creating session and validation-----------

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

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  //  Redirecting if already authenticated---------
  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/home");
    }
  }, [router]);

  // function to handle sign-up -------------------
  const handleSignup = (e) => {
    e.preventDefault();

    // validation-------
    if (!username.trim()) {
      return setErrorMsg("Username is required.");
    }
    if (!password.trim()) {
      return setErrorMsg("Password is required.");
    }
    if (password !== confirmPassword) {
      return setErrorMsg("Passwords do not match.");
    }

    // creating session using token----
    const token = generateToken({ username });
    setSession(token);

    setErrorMsg("");

    router.push("/home");
  };

  return (
    <div className="flex h-fit flex-col mt-28 items-center">
      <Card className="w-full max-w-76 md:max-w-lg">
        <CardHeader>
          <CardTitle>Sign-up for account</CardTitle>
          <CardDescription>
            Enter username and password below to sign-up
          </CardDescription>
          <CardAction>
            <Button asChild variant={"outline"}>
              <Link className="font-semibold" href={"/sign-in"}>
                Sign in
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <Input
                  id="confirm_password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  required
                />
              </div>

              {/* Error message */}
              {errorMsg && (
                <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
              )}
              <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                  Sign-up
                </Button>
              </CardFooter>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
