"use client";

import * as React from "react";
import Link from "next/link";
import { Image } from "@/components/common/Image";
import { InputField } from "@/components/common/InputField";
import { PasswordField } from "@/components/common/PasswordField";
import { SocialButton } from "@/components/common/SocialButton";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import Stepper, { Step } from "@/components/common/Stepper";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuthStore } from "@/store/auth.store";
import { Gender } from "@/services/auth.service";
import { X, KeyRound, CircleUser, Sparkles } from "lucide-react";
import { Fireworks } from "@/components/common/Fireworks";
import { useTranslations } from "next-intl";

export interface RegisterFormProps { }

const RegisterForm: React.FC<RegisterFormProps> = () => {
  const t = useTranslations("Auth");
  const {
    registerStep1,
    registerStep2,
    isLoading,
    error,
    clearError,
    registerStep,
    resetRegister,
  } = useAuthStore();

  // Step 1 states
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  // Step 1 validation errors
  const [usernameError, setUsernameError] = React.useState<string | undefined>();
  const [emailError, setEmailError] = React.useState<string | undefined>();
  const [passwordError, setPasswordError] = React.useState<string | undefined>();
  const [confirmPasswordError, setConfirmPasswordError] = React.useState<string | undefined>();

  // Step 2 states
  const [displayName, setDisplayName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<
    "male" | "female" | "not-specified" | null
  >(null);

  // Step 2 validation errors
  const [nameError, setNameError] = React.useState<string | undefined>();
  const [ageError, setAgeError] = React.useState<string | undefined>();
  const [genderError, setGenderError] = React.useState<string | undefined>();

  // Current step state
  const [currentStep, setCurrentStep] = React.useState(1);

  // Validation toast message
  const [validationMessage, setValidationMessage] = React.useState<string | null>(null);

  // Auto-dismiss error after 5 seconds
  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  // Auto-dismiss validation message after 5 seconds
  React.useEffect(() => {
    if (validationMessage) {
      const timer = setTimeout(() => {
        setValidationMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [validationMessage]);

  // Map gender from UI to API format
  const mapGenderToEnum = (
    gender: "male" | "female" | "not-specified" | null
  ): Gender => {
    if (gender === "male") return Gender.MALE;
    if (gender === "female") return Gender.FEMALE;
    return Gender.OTHER;
  };

  // Validation functions - return error message or null
  const validateUsername = (nameValue: string): string | null => {
    if (!nameValue.trim()) {
      const msg = t("register.usernameRequired");
      setUsernameError(msg);
      return msg;
    }
    if (nameValue.trim().length < 2) {
      const msg = t("register.usernameMin");
      setUsernameError(msg);
      return msg;
    }
    const englishRegex = /^[a-zA-Z\s]+$/;
    if (!englishRegex.test(nameValue.trim())) {
      const msg = t("register.usernameEnglish");
      setUsernameError(msg);
      return msg;
    }
    setUsernameError(undefined);
    return null;
  };

  const validateEmail = (emailValue: string): string | null => {
    if (!emailValue.trim()) {
      const msg = t("register.emailRequired");
      setEmailError(msg);
      return msg;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      const msg = t("register.emailInvalid");
      setEmailError(msg);
      return msg;
    }
    setEmailError(undefined);
    return null;
  };

  const validatePassword = (passwordValue: string): string | null => {
    if (!passwordValue.trim()) {
      const msg = t("register.passwordRequired");
      setPasswordError(msg);
      return msg;
    }
    if (passwordValue.length < 6) {
      const msg = t("register.passwordMin");
      setPasswordError(msg);
      return msg;
    }
    setPasswordError(undefined);
    return null;
  };

  const validateConfirmPassword = (
    passwordValue: string,
    confirmPasswordValue: string
  ): string | null => {
    if (!confirmPasswordValue.trim()) {
      const msg = t("register.confirmPasswordRequired");
      setConfirmPasswordError(msg);
      return msg;
    }
    if (passwordValue !== confirmPasswordValue) {
      const msg = t("register.passwordMismatch");
      setConfirmPasswordError(msg);
      return msg;
    }
    setConfirmPasswordError(undefined);
    return null;
  };

  const validateStep1 = (): boolean => {
    // If all fields are empty, show a single message
    if (!username.trim() && !email.trim() && !password.trim() && !confirmPassword.trim()) {
      setValidationMessage(t("register.fillAll"));
      return false;
    }
    const nameMsg = validateUsername(username);
    const emailMsg = validateEmail(email);
    const pwMsg = validatePassword(password);
    const confirmPwMsg = validateConfirmPassword(password, confirmPassword);
    const msgs = [nameMsg, emailMsg, pwMsg, confirmPwMsg].filter(Boolean) as string[];
    if (msgs.length > 0) {
      setValidationMessage(msgs.join("\n"));
      return false;
    }
    return true;
  };

  const validateStep2 = (): boolean => {
    // If all fields are empty, show a single message
    if (!displayName.trim() && !age.trim() && !gender) {
      setValidationMessage(t("register.fillAll"));
      return false;
    }
    let isValid = true;
    const msgs: string[] = [];

    if (!displayName.trim()) {
      setNameError(t("register.displayNameRequired"));
      msgs.push(t("register.displayNameRequired"));
      isValid = false;
    } else if (displayName.trim().length < 2) {
      setNameError(t("register.displayNameMin"));
      msgs.push(t("register.displayNameMin"));
      isValid = false;
    } else {
      setNameError(undefined);
    }

    if (!age.trim()) {
      setAgeError(t("register.ageRequired"));
      msgs.push(t("register.ageRequired"));
      isValid = false;
    } else {
      const ageNum = parseInt(age, 10);
      if (isNaN(ageNum) || ageNum < 0 || ageNum > 100) {
        setAgeError(t("register.ageInvalid"));
        msgs.push(t("register.ageInvalid"));
        isValid = false;
      } else {
        setAgeError(undefined);
      }
    }

    if (!gender) {
      setGenderError(t("register.genderRequired"));
      msgs.push(t("register.genderRequired"));
      isValid = false;
    } else {
      setGenderError(undefined);
    }

    if (!isValid) {
      setValidationMessage(msgs.join("\n"));
    }
    return isValid;
  };

  // Handle Step 1 Next Button
  const handleStep1Next = async (): Promise<boolean> => {
    clearError();
    setUsernameError(undefined);
    setEmailError(undefined);
    setPasswordError(undefined);
    setConfirmPasswordError(undefined);

    if (!validateStep1()) {
      return false;
    }





    try {
      await registerStep1({
        username: username.trim(),
        email: email.trim(),
        password,
        confirmPassword,
      });
      return true;
    } catch (error) {
      console.error("Register Step 1 failed:", error);
      return false;
    }
  };

  // Handle Step 2 Complete Button
  const handleStep2Complete = async (): Promise<boolean> => {
    clearError();
    setNameError(undefined);
    setAgeError(undefined);
    setGenderError(undefined);

    // Validate all fields first
    if (!validateStep2()) {
      return false;
    }



    try {
      await registerStep2({
        name: displayName.trim(),
        age: parseInt(age, 10),
        gender: mapGenderToEnum(gender),
      });
      return true;
    } catch (error) {
      console.error("Register Step 2 failed:", error);
      return false;
    }
  };

  const handleStepChange = (step: number) => {
    if (step < currentStep) {
      if (currentStep === 2 && step === 1) {
        setDisplayName("");
        setNameError(undefined);
        setAge("");
        setAgeError(undefined);
        setGender(null);
        setGenderError(undefined);
      }
      setCurrentStep(step);
      setStepperStep(step);
      clearError();
    }
  };

  // Check if Step 1 is complete (all fields filled)
  const isStep1Complete = (): boolean => {
    return (
      username.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== ""
    );
  };

  // Check if Step 2 is complete (all fields filled)
  const isStep2Complete = (): boolean => {
    return (
      displayName.trim() !== "" &&
      age.trim() !== "" &&
      gender !== null
    );
  };

  // Clear errors when user types
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setUsername(value);
      if (usernameError) setUsernameError(undefined);
      if (error) clearError();
      if (validationMessage) setValidationMessage(null);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(undefined);
    if (error) clearError();
    if (validationMessage) setValidationMessage(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError(undefined);
    if (error) clearError();
    if (validationMessage) setValidationMessage(null);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (confirmPasswordError) setConfirmPasswordError(undefined);
    if (error) clearError();
    if (validationMessage) setValidationMessage(null);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 25) {
      setDisplayName(value);
      if (nameError) setNameError(undefined);
      if (error) clearError();
      if (validationMessage) setValidationMessage(null);
    }
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseInt(value, 10);
    if (
      value === "" ||
      (!isNaN(numValue) && numValue >= 0 && numValue <= 100)
    ) {
      setAge(value);
      if (ageError) setAgeError(undefined);
      if (error) clearError();
      if (validationMessage) setValidationMessage(null);
    }
  };

  const handleGenderSelect = (
    selectedGender: "male" | "female" | "not-specified"
  ) => {
    setGender(selectedGender === gender ? null : selectedGender);
    if (genderError) setGenderError(undefined);
    if (error) clearError();
    if (validationMessage) setValidationMessage(null);
  };

  const [stepperStep, setStepperStep] = React.useState(currentStep);

  React.useEffect(() => {
    if (registerStep > currentStep) {
      setCurrentStep(registerStep);
      setStepperStep(registerStep);
    }
  }, [registerStep, currentStep]);

  React.useEffect(() => {
    setStepperStep(currentStep);
  }, [currentStep]);

  return (
    <div className="w-full ">
      <LoadingOverlay isLoading={isLoading} message={t("register.loading")} />
      <Stepper
        key={stepperStep}
        initialStep={stepperStep}
        onStepChange={(step: number) => {
          if (step < currentStep) {
            if (currentStep === 2 && step === 1) {
              setDisplayName("");
              setNameError(undefined);
              setAge("");
              setAgeError(undefined);
              setGender(null);
              setGenderError(undefined);
              resetRegister();
            }
            setCurrentStep(step);
            setStepperStep(step);
            clearError();
          }
        }}
        onFinalStepCompleted={async () => {
          if (currentStep === 2) {
            const success = await handleStep2Complete();
            if (success) {
            }
          }
        }}
        backButtonText={t("stepper.back")}
        nextButtonText={t("stepper.next")}
        completeButtonText={t("stepper.complete")}
        stepContainerClassName="px-5"
        footerClassName="px-0"
        footerLeftContent={
          <p className="text-[13px] md:text-[14px] text-gray-600">
            {t("register.hasAccount")}{" "}
            <Link
              href="/login"
              className="text-[#1cb0f6] font-semibold hover:text-[#17a3e3] transition-colors underline"
            >
              {t("register.loginText")}
            </Link>
          </p>
        }
        disableStepIndicators={true}
        backButtonProps={{
          disabled: isLoading,
        }}
        nextButtonProps={{
          disabled: isLoading,
          onClick: async (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (currentStep === 1) {
              const success = await handleStep1Next();
              if (success) {
              }
            } else if (currentStep === 2) {
              const success = await handleStep2Complete();
              if (success) {
              }
            }
          }
        }}
        renderStepIndicator={({ step, currentStep, onStepClick, disableStepIndicators }) => {
          const icons = [
            <KeyRound key="1" className="w-4 h-4" />,
            <CircleUser key="2" className="w-4 h-4" />,
            <Sparkles key="3" className="w-4 h-4" />,
          ];
          const isActive = currentStep === step;
          const isComplete = currentStep > step;
          return (
            <div
              onClick={() => onStepClick(step)}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                disableStepIndicators ? "cursor-default" : "cursor-pointer"
              } ${isActive || isComplete
                ? "bg-[#1cb0f6] text-white"
                : "bg-[#A1AEBE] text-white"
                }`}
            >
              {icons[step - 1]}
            </div>
          );
        }}
      >
        {/* Step 1: Create Account */}
        <Step>
          {/* Logo / Brand */}
          <div className="flex items-center justify-center mb-4 md:mb-1">
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

          <h2 className=" font-bold text-gray-800 mb-2 text-center">
            {t("register.title")}
          </h2>


          {/* Input Fields */}
          <div className="relative z-10 flex flex-col gap-5 md:gap-6 w-full items-center mb-4">
            <div className="flex flex-col gap-5 md:gap-6 w-full max-w-[460px]">
              <InputField
                label={t("register.usernameLabel")}
                type="text"
                placeholder={t("login.usernameLabel")}
                value={username}
                error={usernameError}
                showErrorText={false}
                onChange={handleUsernameChange}
                maxLength={30}
                required
                disabled={isLoading}
              />

              <InputField
                label={t("register.emailLabel")}
                type="email"
                placeholder="example@gmail.com"
                value={email}
                error={emailError}
                showErrorText={false}
                onChange={handleEmailChange}
                required
                disabled={isLoading}
              />

              <PasswordField
                label={t("register.passwordLabel")}
                placeholder={t("login.passwordLabel")}
                value={password}
                error={passwordError}
                showErrorText={false}
                onChange={handlePasswordChange}
                required
                disabled={isLoading}
              />

              <PasswordField
                label={t("register.confirmPasswordLabel")}
                placeholder={t("forgetPassword.confirmPasswordLabel")}
                value={confirmPassword}
                error={confirmPasswordError}
                showErrorText={false}
                onChange={handleConfirmPasswordChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>
        </Step>

        {/* Step 2: Fill Information */}
        <Step>
          <p className="text-[20px] md:text-[22px] lg:text-[24px] leading-tight font-bold text-center mt-4 md:mt-6 mb-6 md:mb-8">
            <span className="text-gray-800">{t("register.welcome")} </span>
            <span className="text-[#1cb0f6]">P&apos;Bit </span>
            <span className="text-[#ffd300]">Nong Brite</span>
          </p>

          {/* Form Fields */}
          <div className="relative z-10 flex flex-col gap-5 md:gap-6 w-full items-center mb-4">
            <div className="w-full max-w-[460px] flex flex-col gap-5 md:gap-6">
              <InputField
                label={t("register.displayNameLabel")}
                type="text"
                placeholder={t("register.displayNameLabel")}
                value={displayName}
                error={nameError}
                showErrorText={false}
                onChange={handleNameChange}
                maxLength={25}
                required
                disabled={isLoading}
              />

              <InputField
                label={t("register.ageLabel")}
                type="number"
                placeholder={t("register.ageRequired")}
                value={age}
                error={ageError}
                showErrorText={false}
                onChange={handleAgeChange}
                min={0}
                max={100}
                required
                disabled={isLoading}
              />

              {/* Gender Label */}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[12px] leading-[18px] font-semibold text-gray-700">
                  {t("register.genderLabel")}
                </label>

                {/* Gender Buttons */}
                <div className="flex gap-3 w-full">
                  <SocialButton
                    variant={gender === "male" ? "selected" : "default"}
                    selected={gender === "male"}
                    onSelect={() => handleGenderSelect("male")}
                  >
                    {t("register.genderMale")}
                  </SocialButton>
                  <SocialButton
                    variant={gender === "female" ? "female" : "default"}
                    selected={gender === "female"}
                    onSelect={() => handleGenderSelect("female")}
                  >
                    {t("register.genderFemale")}
                  </SocialButton>
                  <SocialButton
                    variant={
                      gender === "not-specified" ? "not-specified" : "default"
                    }
                    selected={gender === "not-specified"}
                    onSelect={() => handleGenderSelect("not-specified")}
                  >
                    {t("register.genderOther")}
                  </SocialButton>
                </div>
              </div>

            </div>
          </div>
        </Step>

        {/* Step 3: Complete */}
        <Step>
          {/* Fireworks Effect - fixed full screen */}
          <Fireworks />

          {/* Image Section */}
          <div className="flex flex-col items-center gap-4 w-full mt-4">
            <Image
              src="/images/Nong_brite/nong-brite-01.svg"
              alt="Finish"
              fill
              containerClassName="w-[120px] h-[120px]"
              className="object-contain"
              priority
              sizes="120px"
            />
          </div>

          {/* Title */}
          <p className="text-[22px] md:text-[24px] leading-tight font-bold text-gray-800 text-center w-full mt-4">
            {t("register.finishTitle")}
          </p>

          {/* Description */}
          <p className="text-[13px] md:text-[14px] leading-tight font-semibold text-gray-500 text-center w-full mt-2">
            {t("register.finishSubtitle")}
          </p>
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

RegisterForm.displayName = "RegisterForm";

export { RegisterForm };
