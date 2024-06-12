import { SetStateAction, useState } from "react";

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

export default function CodeForReset() {
  const [code, setCode] = useState(" ");
  const email = localStorage.getItem("email");

  const handleSendCode = async () => {
    const response = await fetch("http://localhost:8080/api/v1/verifyResetCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body:JSON.stringify({email,code}),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    // setUser(result.data);
    console.log("Success validate for reset:", result.data);
    // localStorage.setItem("temp_token", JSON.stringify(res));
    // router.push("/");
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Validate User</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Enter code for validation</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
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
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSendCode}>Send code</Button>
      </CardFooter>
    </Card>
  );
}
