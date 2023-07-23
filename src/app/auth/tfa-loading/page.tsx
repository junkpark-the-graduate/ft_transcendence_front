"use client";

import React from "react";
import { Intro } from "@/ui/Intro/Intro";
import { VerifyButton } from "../components/VerifyButton";

export default async function Page() {
  return <Intro children={<VerifyButton />} />;
}
