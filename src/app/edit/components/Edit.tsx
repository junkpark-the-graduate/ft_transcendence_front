"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Switch, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { Component } from "react";

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
        twoFactor: twoFactor,
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
        <TextField
          required
          inputProps={{ maxLength: 10 }}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="name"
          id="name"
          name="name"
          variant="outlined"
          sx={{
            input: { color: "white" },
            "& label.Mui-focused": {
              "& > fieldset": { borderColor: "white" },
            },
            "& .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "white" },
            },
            "& .MuiOutlinedInput-root:hover": {
              "& > fieldset": { borderColor: "white" },
            },
          }}
        />
        <TextField
          required
          inputProps={{ maxLength: 50 }}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          id="email"
          name="email"
          variant="outlined"
          sx={{
            input: { color: "white" },
            "& label.Mui-focused": {
              "& > fieldset": { borderColor: "white" },
            },
            "& .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "white" },
            },
            "& .MuiOutlinedInput-root:hover": {
              "& > fieldset": { borderColor: "white" },
            },
          }}
        />
        <Switch
          checked={twoFactor}
          onChange={() => {
            setTwoFactor(!twoFactor);
          }}
        ></Switch>
        <div>
          <Button
            type="submit"
            variant="contained"
            sx={{
              color: "#0b131f",
              backgroundColor: "#90caf9",
              fontWeight: "bold",
            }}
          >
            save
          </Button>
        </div>
      </form>
    </>
  );
};

export default Edit;
