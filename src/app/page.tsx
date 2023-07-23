"use client";

import React from "react";
import { Intro } from "@/ui/Intro/Intro";
import { SignInButton } from "@/ui/Intro/SignInButton";

export default function Home() {
  return <Intro children={<SignInButton />} />;
}
