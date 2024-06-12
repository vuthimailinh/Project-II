"use client";
import { SetStateAction, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";

export default function CodeForRegistration() {
  const router = useRouter();
  const [code, setCode] = useState(" ");
  const email = localStorage.getItem("email");
  useEffect(() => {
    const handle = async () => {
      try {
        // const { username, email, password } = values;
        // console.log(JSON.stringify({ username, email, password }))
        const response = await fetch(
          "http://localhost:8080/api/v1/auth/sendCode",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify({ email }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("user enter code:");
      } catch (e) {
        console.log(e);
      }
    };
    handle();
  }, []);

  const handleSendCode = async () => {
    console.log(JSON.stringify({ email, code }))
    const response = await fetch(
      "http://localhost:8080/api/v1/auth/verifyUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ email, code }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.json()}`);
    }

    const result = await response.json();
    // setUser(result.data);
    console.log("Success verifiy user:", result.data);
    // localStorage.setItem("user", JSON.stringify(result.data));
    localStorage.removeItem("email");
    try {
      // const access_token = localStorage.getItem("access_token");
      // if (!access_token) return;
      const response = await fetch(
        "http://localhost:8080/api/v1/user/getUser",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // setUser(result.data);
      console.log("Success get info:", result.data);
      localStorage.setItem("user", JSON.stringify(result.data));
      window.location.replace("/");
      // setUser(result.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Validate User</CardTitle>
      </CardHeader>
      <CardContent>
        <InputOTP
          maxLength={6}
          value={code}
          onChange={(value: SetStateAction<string>) => {
            setCode(value);
          }}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSendCode}>Send code</Button>
      </CardFooter>
    </Card>
  );
}
