"use client";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WEBSITE_HOME } from "@/routes/WebsiteRoute";

const EmailVerification = ({ params }) => {
   const resolvedParams = React.use(params);
  const { token } = resolvedParams;
  const [isVeriFied, setIsVerified] = useState(false);

  useEffect(() => {
    if (!token) return;
    const verify = async () => {
      try {
        const decodedToken = decodeURIComponent(token);
        const { data: varificatioinResponse } = await axios.post(
          "/api/auth/verify-email",
          { token: decodedToken }
        );
        if (varificatioinResponse.success) {
          setIsVerified(true);
        }
      } catch (error) {
        setIsVerified(false);
      }
    };
    verify();
  }, [token]);

  return (
    <div>
      <Card className="w-[400px] max-w-md mx-auto p-6 bg-white rounded-lg shadow dark:bg-gray-800 mt-24">
        <CardContent>
          {isVeriFied ? (
            <div className=" text-center items-center">
              <Image
                src="/assets/images/verified.gif"
                alt="verified"
                width={400}
                height={300}
                unoptimized
              />
              <h1 className="text-xl font-bold text-green-500">
                Email Verified
              </h1>
              <Button asChild className="text-center text-2xl my-4">
                <Link href={WEBSITE_HOME}>Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className=" text-center items-center">
              <Image
                src="/assets/images/verification-failed.gif"
                alt="verification failed"
                width={300}
                height={100}
                unoptimized
              />
              <p className="text-red-500">Email Verification Failed</p>
              <Button asChild className="text-center text-2xl my-4">
                <Link href={WEBSITE_HOME}>Home</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerification;
