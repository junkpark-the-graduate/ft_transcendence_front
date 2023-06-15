"use client";

import CustomButton from "@/app/user/components/CustomButton";
import { useForm, FieldErrors } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";

interface HookFormTypes {
  name: string;
  email: string;
}

export function getToken() {
  const tokenCookie = Cookies.get("accessToken");
  return tokenCookie ? tokenCookie : null;
}

const HookForm = () => {
  const { register, handleSubmit, reset, setValue } = useForm<HookFormTypes>();
  const router = useRouter();

  const onValid = async (data: HookFormTypes) => {
    const { name, email } = data;
    const token = getToken();
    const res = await fetch("http://127.0.0.1:3001/user", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push("/user");
      router.refresh();
    } else {
      console.log("Failed to update user");
    }
  };
  const onInvalid = (error: FieldErrors) => {
    console.log(error);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <ul>
        <li>
          <input
            {...register("name", {
              required: true,
              maxLength: {
                value: 20,
                message: "name is mandatory",
              },
            })}
            type="text"
            placeholder="new name"
          />
        </li>
        <li>
          <input
            {...register("email", {
              required: true,
              maxLength: {
                value: 250,
                message: "email is mandatory",
              },
            })}
            type="email"
            placeholder="new email"
          />
        </li>
        <li>
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
        </li>
      </ul>
    </form>
  );
};

export default function Edit() {
  return <HookForm />;
}
