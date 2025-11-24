"use client";

import * as React from "react";

import { Container } from "@/components/common/Container";

export const LanguageSelector: React.FC = () => {
  const placeholders = Array.from({ length: 7 });

  return (
    <div className="grid gap-4">
      {placeholders.map((_, index) => (
        <Container key={index} variant="white" className="w-full">
          <div className="h-[100px] w-full" />
        </Container>
      ))}
    </div>
  );
};