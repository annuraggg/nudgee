"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import app from "../../firebaseConfig";
import {
  Auth,
  ConfirmationResult,
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

const AuthInputs = () => {
  const [phone, setPhone] = useState<number>(0);
  const [step, setStep] = useState<number>(0);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [otp, setOTP] = useState<string>("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult>();
  const [userExists, setUserExists] = useState<boolean>(false);

  const auth: Auth = getAuth(app);
  const toast = useToast();

  const { push } = useRouter();

  const btnRef = useRef<HTMLButtonElement>(null);
  const otpBtnRef = useRef<HTMLButtonElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const otpFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (otp.length === 6) {
      otpBtnRef.current?.removeAttribute("disabled");
    } else {
      otpBtnRef.current?.setAttribute("disabled", "true");
    }
  }, [otp]);

  useEffect(() => {
    if (phone.toString().length === 10) {
      btnRef.current?.removeAttribute("disabled");
    } else {
      btnRef.current?.setAttribute("disabled", "true");
    }
  }, [phone]);

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "sendOTP", {
      size: "invisible",
    });
  }, [auth]);

  useEffect(() => {
    if (step === 1) {
      otpFieldRef.current?.focus();
    } else {
      phoneRef.current?.focus();
    }
  }, [step]);

  const sendOTP = () => {
    setBtnLoading(true);
    signInWithPhoneNumber(auth, `+91${phone}`, window.recaptchaVerifier)
      .then(async (confirmationResult) => {
        setConfirmationResult(confirmationResult);
        setStep(1);

        const db = getFirestore(app);
        const cacheRef = doc(db, "cache", "phone");
        const docSnap = await getDoc(cacheRef);
        const phoneCache = docSnap.data()?.number || [];
        if (phoneCache.includes(`+91${phone}`)) {
          setUserExists(true);
        }
      })
      .catch((error) => {
        if (error.code === "auth/too-many-requests") {
          toast({
            title: "Too many requests",
            description: "Please try again later",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        }

        if (error.code === "auth/invalid-phone-number") {
          toast({
            title: "Invalid Phone Number",
            description: "Please enter a valid phone number",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        }

        if (error.code === "auth/missing-phone-number") {
          toast({
            title: "Missing Phone Number",
            description: "Please enter a valid phone number",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        }

        console.log(error);
        toast({
          title: "Something went wrong",
          description: "Please try again later",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setBtnLoading(false);
      });
  };

  const verifyOTP = () => {
    setBtnLoading(true);
    confirmationResult
      ?.confirm(otp)
      .then((result) => {
        if (!userExists) {
          const db = getFirestore(app);
          const userRef = doc(db, "users", result.user.uid);
          setDoc(userRef, {});

          const cacheRef = doc(db, "cache", "phone");
          updateDoc(cacheRef, {
            number: arrayUnion(`+91${phone}`),
          });
        }
        push("/chats");
      })
      .catch((error) => {
        if (error.code === "auth/code-expired") {
          toast({
            title: "OTP Expired",
            description: "Please try again",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        }

        if (error.code === "auth/invalid-verification-code") {
          toast({
            title: "Invalid OTP",
            description: "Please enter a valid OTP",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        }

        console.log(error);
        toast({
          title: "Something went wrong",
          description: "Please try again later",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setBtnLoading(false);
      });
  };

  const setPhoneFunc = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (step === 0 && phone.toString().length === 10) {
        sendOTP();
      }
    }
  };

  const setOTPFunc = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (step === 1 && otp.length === 6) {
        verifyOTP();
      }
    }
  };

  return (
    <>
      {step === 0 ? (
        <>
          <p className=" text-lg mt-5" style={{ fontFamily: "Alegreya" }}>
            Please Enter Your Phone Number to Continue
          </p>
          <InputGroup>
            <InputLeftAddon>+91</InputLeftAddon>
            <Input
              onChange={(e) => setPhone(parseInt(e.target.value))}
              onKeyDown={(e) => setPhoneFunc(e)}
              placeholder="Phone Number"
              ref={phoneRef}
              isDisabled={btnLoading}
            />
          </InputGroup>
          <Button
            className="btn btn-neutral"
            ref={btnRef}
            onClick={sendOTP}
            id="sendOTP"
            variant="unstyled"
            isLoading={btnLoading}
          >
            Continue
          </Button>
          <Text fontSize="10px">
            {" "}
            *Standard messaging rates may apply for SMS verification.
          </Text>
        </>
      ) : step === 1 ? (
        <>
          <p className=" text-lg mt-5" style={{ fontFamily: "Alegreya" }}>
            Enter the OTP sent to your phone number
          </p>
          <Stack>
            <HStack>
              <PinInput size="lg" otp onChange={setOTP} value={otp} isDisabled={btnLoading}>
                <PinInputField ref={otpFieldRef} />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField onKeyDown={(e) => setOTPFunc(e)} />
              </PinInput>
            </HStack>
          </Stack>
          <Button
            variant="unstyled"
            isLoading={btnLoading}
            className="btn btn-neutral"
            id="sendOTP"
            ref={otpBtnRef}
            onClick={verifyOTP}
          >
            Verify
          </Button>
        </>
      ) : null}
    </>
  );
};

export default AuthInputs;
