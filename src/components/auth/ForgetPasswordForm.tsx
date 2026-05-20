"use client";

import * as React from "react";
import { Image } from "@/components/common/Image";
import { InputField } from "@/components/common/InputField";
import { PasswordField } from "@/components/common/PasswordField";
import { OTPInput } from "@/components/common/OTPInput";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import Stepper, { Step } from "@/components/common/Stepper";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/auth.store";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";

export interface ForgetPasswordFormProps {
  onSubmit?: (email: string, otp: string, password: string, confirmPassword: string) => void;
}

const ForgetPasswordForm: React.FC<ForgetPasswordFormProps> = ({ onSubmit }) => {
  const router = useRouter();
  const t = useTranslations("Auth");
  const { forgotPassword, resetPassword, isLoading, error, clearError } = useAuthStore();
  const [validationMessage, setValidationMessage] = React.useState<string | null>(null);
  const [currentStep, setCurrentStep] = React.useState(1);

  // Step 1: Email
  const [email, setEmail] = React.useState("");

  // Step 2: OTP
  const [otp, setOtp] = React.useState<string[]>([]);
  const [countdown, setCountdown] = React.useState(0);
  const [hasOTPError, setHasOTPError] = React.useState(false);

  // Step 3: Reset Password
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  // Countdown timer
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleStep1Next = async (): Promise<boolean> => {
    if (!email.trim()) {
      setValidationMessage(t("register.emailRequired"));
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationMessage(t("register.emailInvalid"));
      return false;
    }

    clearError();
    setValidationMessage(null);
    try {
      await forgotPassword(email.trim());
      return true;
    } catch {
      return false;
    }
  };

  const handleStep2Next = async (): Promise<boolean> => {
    if (otp.join("").length < 6) {
      setValidationMessage("Please complete the OTP");
      return false;
    }
    setValidationMessage(null);
    return true;
  };

  const handleStep3Next = async (): Promise<boolean> => {
    if (!password || !confirmPassword) {
      setValidationMessage(t("register.passwordRequired"));
      return false;
    }
    if (password !== confirmPassword) {
      setValidationMessage(t("register.passwordMismatch"));
      return false;
    }
    if (password.length < 6) {
      setValidationMessage(t("register.passwordMin"));
      return false;
    }

    clearError();
    setValidationMessage(null);
    try {
      await resetPassword({
        email: email.trim(),
        pin: otp.join(""),
        newPassword: password,
      });
      onSubmit?.(email.trim(), otp.join(""), password, confirmPassword);
      return true;
    } catch {
      return false;
    }
  };

  const handleFinalStepCompleted = () => {
    // Already in success step, this function might just navigate
    router.push("/login");
  };

  // Auto-dismiss errors after 5 seconds
  React.useEffect(() => {
    if (error || validationMessage) {
      const timer = setTimeout(() => {
        if (error) clearError();
        if (validationMessage) setValidationMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, validationMessage, clearError]);

  const handleOTPChange = (value: string[]) => {
    setOtp(value);
    setHasOTPError(false);
  };

  const handleOTPComplete = (value: string) => {
    if (value.length === 6) {
      setHasOTPError(false);
      // Countdown will be started when step changes via Stepper
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || isLoading) return;

    clearError();
    setValidationMessage(null);
    try {
      await forgotPassword(email.trim());
      setOtp([]);
      setHasOTPError(false);
      setCountdown(15);
    } catch {
      // Error is handled in store
    }
  };

  // Step 1: Enter Email
  const renderStep1 = () => (
    <>
      {/* Title */}
      <h1 className="text-[24px] sm:text-[26px] md:text-[28px] font-bold text-gray-800 leading-tight mb-1 text-center mt-3">
        {t("forgetPassword.title1")}
      </h1>

      {/* Subtitle */}
      <p className="text-[13px] md:text-[14px] text-gray-500 mb-4 md:mb-5 text-center">
        {t("forgetPassword.subtitle1")}
      </p>

      {/* Input Field */}
      <div className="flex flex-col gap-4 md:gap-5 w-full items-center mb-1 ">
        <div className="w-[360px] max-w-[460px]">
          <InputField
            label={t("forgetPassword.emailLabel")}
            type="email"
            placeholder={t("forgetPassword.emailPlaceholder")}
            value={email}
            className="h-[48px] md:h-[50px] bg-[#f5f9fb] border-2 border-[#d4e3ed] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 hover:border-[#93c5fd] hover:bg-[#f0f9ff] focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
    </>
  );

  // Step 2: OTP Verification
  const renderStep2 = () => (
    <div className="flex flex-col w-full gap-4 md:gap-5 ">
      {/* Title */}
      <h1 className="text-[24px] sm:text-[26px] md:text-[28px] font-bold text-gray-800 leading-tight text-center mt-3">
        {t("forgetPassword.title2")}
      </h1>

      {/* Description */}
      <p className="text-[13px] md:text-[14px] text-gray-500 text-center">
        {t("forgetPassword.subtitle2_1")}<br />
        {t("forgetPassword.subtitle2_2")}
      </p>

      {/* OTP Input Fields */}
      <div className="flex justify-center w-full mb-4">
        <OTPInput
          length={6}
          value={otp}
          onChange={handleOTPChange}
          onComplete={handleOTPComplete}
          hasError={hasOTPError}
        />
      </div>

      {/* Resend Email Link */}
      <div className="flex justify-center w-full mb-4">
        <p className="text-[13px] md:text-[14px] text-gray-500 text-center">
          <span>{t("forgetPassword.noEmail")} </span>
          {countdown > 0 ? (
            <span className="text-[#1cb0f6]">
              {t("forgetPassword.resendWait", { countdown })}
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-[#1cb0f6] underline decoration-solid underline-offset-0 hover:text-[#17a3e3] transition-colors"
            >
              {t("forgetPassword.resendBtn")}
            </button>
          )}
        </p>
      </div>
    </div>
  );

  // Step 3: Reset Password
  const renderStep3 = () => (
    <>
      {/* Title */}
      <h1 className="text-[24px] sm:text-[26px] md:text-[28px] font-bold text-gray-800 leading-tight mb-1 text-center mt-3">
        {t("forgetPassword.title3")}
      </h1>

      {/* Description */}
      <p className="text-[13px] md:text-[14px] text-gray-500 mb-4 md:mb-5 text-center">
        {t("forgetPassword.subtitle3")}
      </p>

      {/* Password Fields */}
      <div className="flex flex-col gap-4 md:gap-5 w-full items-center">
        <div className="w-full max-w-[460px] flex flex-col gap-4 md:gap-5 ">
          <PasswordField
            label={t("forgetPassword.passwordLabel")}
            placeholder={t("forgetPassword.passwordPlaceholder")}
            value={password}
            className="h-[48px] md:h-[50px] bg-[#f5f9fb] border-2 border-[#d4e3ed] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 hover:border-[#93c5fd] hover:bg-[#f0f9ff] focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <PasswordField
            label={t("forgetPassword.confirmPasswordLabel")}
            placeholder={t("forgetPassword.confirmPasswordPlaceholder")}
            value={confirmPassword}
            className="h-[48px] md:h-[50px] bg-[#f5f9fb] border-2 border-[#d4e3ed] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 hover:border-[#93c5fd] hover:bg-[#f0f9ff] focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all mb-1"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      </div>
    </>
  );

  // Step 4: Success
  const renderStep4 = () => (
    <>
      {/* Image Section */}
      <div className="flex flex-col items-center gap-4 w-full">
        <Image
          src="/images/Nong_brite/nong-brite-01.svg"
          alt="Success"
          fill
          containerClassName="w-[120px] h-[120px]"
          className="object-contain"
          priority
          sizes="120px"
        />
      </div>

      {/* Title */}
      <h1 className="text-[22px] md:text-[24px] leading-tight font-bold text-gray-800 text-center w-full">
        {t("forgetPassword.title4")}
      </h1>

      {/* Description */}
      <p className="text-[13px] md:text-[14px] leading-tight font-semibold text-gray-500 text-center w-full mt-2">
        {t("forgetPassword.subtitle4_1")}<br />
        {t("forgetPassword.subtitle4_2")}
      </p>

    </>
  );

  return (
    <div className="w-full ">
      <LoadingOverlay isLoading={isLoading} message={t("register.loading")} />
      <Stepper
        key={currentStep}
        initialStep={currentStep}
        onStepChange={(step) => {
          if (step < currentStep) {
            setCurrentStep(step);
            clearError();
            setValidationMessage(null);
          }
        }}
        onFinalStepCompleted={handleFinalStepCompleted}
        backButtonText={t("stepper.back")}
        nextButtonText={t("stepper.next")}
        stepContainerClassName="px-0"
        footerClassName="px-0"
        disableStepIndicators={true}
        backButtonProps={{ disabled: isLoading }}
        footerLeftContent={
          <button
            type="button"
            onClick={() => router.push("/login")}
            disabled={isLoading}
            className="duration-350 rounded px-2 py-1 text-sm font-medium text-neutral-400 transition hover:text-neutral-700 disabled:pointer-events-none disabled:opacity-50"
          >
            {t("stepper.back")}
          </button>
        }
        nextButtonProps={{
          disabled: isLoading,
          onClick: async (e) => {
            e.preventDefault();
            e.stopPropagation();

            let success = false;
            if (currentStep === 1) {
              success = await handleStep1Next();
              if (success) {
                setCurrentStep(2);
                setCountdown(15); // Start countdown
              }
            } else if (currentStep === 2) {
              success = await handleStep2Next();
              if (success) {
                setCurrentStep(3);
              }
            } else if (currentStep === 3) {
              success = await handleStep3Next();
              if (success) {
                setCurrentStep(4);
              }
            } else if (currentStep === 4) {
              handleFinalStepCompleted();
            }
          }
        }}
      >
        {/* Step 1: Enter Email */}
        <Step>
          {renderStep1()}
        </Step>

        {/* Step 2: OTP Verification */}
        <Step>
          {renderStep2()}
        </Step>

        {/* Step 3: Reset Password */}
        <Step>
          {renderStep3()}
        </Step>

        {/* Step 4: Success */}
        <Step>
          {renderStep4()}
        </Step>
      </Stepper>

      {/* Toast Alert - API ERROR & Validation Errors */}
      {(error || validationMessage) && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5 fade-in duration-300 max-w-[360px] w-full">
          <Alert variant="destructive" className="bg-white border-red-300 shadow-lg rounded-[12px] pl-10">
            <button
              onClick={() => {
                clearError();
                setValidationMessage(null);
              }}
              className="absolute top-3 left-3 text-red-400 hover:text-red-600 transition-colors"
              aria-label="ปิด"
            >
              <X className="w-4 h-4" />
            </button>
            <AlertDescription className="text-[13px] md:text-[14px] text-red-600 whitespace-pre-line">
              {error || validationMessage}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

ForgetPasswordForm.displayName = "ForgetPasswordForm";

export { ForgetPasswordForm };
