"use client";

import * as React from "react";
import { Image, LoadingOverlay } from "@/components/common";
import { InputField } from "@/components/common/InputField";
import { PasswordField } from "@/components/common/PasswordField";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

export interface LoginFormProps {
  onSubmit?: (username: string, password: string) => void;
  isLoading?: boolean;
  error?: string | null;
  onClearError?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false, error, onClearError }) => {
  const t = useTranslations("Auth");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usernameError, setUsernameError] = React.useState<string | undefined>();
  const [passwordError, setPasswordError] = React.useState<string | undefined>();

  // Auto-dismiss error after 5 seconds
  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        onClearError?.();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, onClearError]);

  const validateUsername = (usernameValue: string): boolean => {
    if (!usernameValue.trim()) {
      setUsernameError(t("login.usernameRequired"));
      return false;
    }
    setUsernameError(undefined);
    return true;
  };

  const validatePassword = (passwordValue: string): boolean => {
    if (!passwordValue.trim()) {
      setPasswordError(t("login.passwordRequired"));
      return false;
    }
    setPasswordError(undefined);
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUsernameError(undefined);
    setPasswordError(undefined);

    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(password);

    if (!isUsernameValid || !isPasswordValid) {
      return;
    }

    if (onSubmit && !isLoading) {
      onSubmit(username, password);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (usernameError) {
      setUsernameError(undefined);
    }
    if (error && onClearError) {
      onClearError();
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) {
      setPasswordError(undefined);
    }
    if (error && onClearError) {
      onClearError();
    }
  };

  return (
    <>
      <LoadingOverlay isLoading={isLoading} message={t("login.loading")} />
      <div className="relative w-full ">
        {/* Outer card with landing page theme */}
        <div className="relative bg-white rounded-[32px] md:rounded-[40px] px-4 py-8 sm:px-5 sm:py-10 md:px-6 md:py-12 overflow-hidden ">
          {/* Decorative shapes - matching landing page colors */}
          <div className="pointer-events-none absolute -top-[70px] -right-[80px] w-[280px] h-[200px] md:w-[320px] md:h-[220px] bg-[#38bdf8] rounded-bl-[130px] opacity-20">
            <div className="absolute top-8 -left-10 w-[280px] h-[180px] md:w-[320px] md:h-[200px] bg-[#1cb0f6] rounded-bl-[130px] opacity-30" />
          </div>
          <div className="pointer-events-none absolute -bottom-[110px] -left-[90px] w-[240px] h-[240px] md:w-[280px] md:h-[280px] bg-[#fbbf24] rounded-full opacity-15">
            <div className="absolute top-6 left-8 w-[220px] h-[220px] md:w-[260px] md:h-[260px] bg-[#ffd300] rounded-full opacity-20" />
          </div>

          <div className="relative z-10 ">
            {/* Brand Section */}
            <div className="flex items-center justify-center">
              <Image
                src="/icons/misc/new_logo.svg"
                alt="P'Bit Nong Brite Logo"
                width={280}
                height={77}
                className="object-contain w-[280px] h-auto"
                priority
                sizes="280px"
              />
            </div>
            <h2 className=" font-bold text-gray-800 text-center">
              {t("login.title")}
            </h2>
            {/* Form content */}
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-6 items-center"
            >
              {/* Input Fields */}
              <div className="flex flex-col gap-5 md:gap-6 w-full max-w-[460px]">
                <InputField
                  type="text"
                  label={t("login.usernameLabel")}
                  placeholder={t("login.usernameLabel")}
                  value={username}
                  error={usernameError}
                  onChange={handleUsernameChange}
                  required
                  disabled={isLoading}
                />

                <div className="flex flex-col gap-2 w-full">
                  <PasswordField
                    label={t("login.passwordLabel")}
                    placeholder={t("login.passwordLabel")}
                    value={password}
                    error={passwordError}
                    onChange={handlePasswordChange}
                    required
                    disabled={isLoading}
                  />
                  <div className="flex justify-end">
                    <Link
                      href="/forget-password"
                      className="text-[12px] md:text-[13px] leading-[18px] text-gray-500 hover:text-[#1cb0f6] transition-colors"
                    >
                      {t("login.forgotPassword")}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                aria-label={t("login.title")}
                aria-busy={isLoading}
                className="mt-2 w-full max-w-[460px] h-[50px] md:h-[52px] rounded-[12px] md:rounded-[15px] text-[15px] md:text-[16px] font-semibold bg-[#1cb0f6] text-white hover:bg-[#1699d6] active:bg-[#1280b5] focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {t("login.title")}
              </button>

              {/* Footer Links */}
              <p className="text-center text-[13px] md:text-[14px] text-gray-600 w-full max-w-[460px]">
                {t("login.noAccount")}{" "}
                <Link
                  href="/register"
                  className="text-[#1cb0f6] font-semibold hover:text-[#17a3e3] transition-colors underline"
                >
                  {t("login.createAccount")}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Alert - API ERROR */}
      {error && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5 fade-in duration-300 max-w-[360px] w-full">
          <Alert variant="destructive" className="bg-white border-red-300 shadow-lg rounded-[12px] pl-10">
            <button
              onClick={onClearError}
              className="absolute top-3 left-3 text-red-400 hover:text-red-600 transition-colors"
              aria-label="ปิด"
            >
              <X className="w-4 h-4" />
            </button>
            <AlertDescription className="text-[13px] md:text-[14px] text-red-600">
              {error}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
};

LoginForm.displayName = "LoginForm";

export { LoginForm };
