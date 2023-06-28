"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { Component } from "react";

import { Input, Switch, Button } from "@chakra-ui/react";

const Edit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);
  const router = useRouter();

  function getToken() {
    const tokenCookie = Cookies.get("accessToken");
    return tokenCookie ? tokenCookie : null;
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    const token = getToken();
    const res = await fetch("http://127.0.0.1:3001/user", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        twoFactorEnabled: twoFactor,
      }),
    });
    if (res.ok) {
      router.push("/user");
      router.refresh();
    } else {
      console.log("Failed to update user");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          required
          placeholder="new name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="name"
          id="name"
          name="name"
          variant="outlined"
        />
        <Switch
          checked={twoFactor}
          onChange={() => {
            setTwoFactor(!twoFactor);
          }}
        />
        <div>
          <Button type="submit" variant="contained">
            save
          </Button>
        </div>
      </form>
    </>
  );
};

export default Edit;
