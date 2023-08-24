import { useRouter } from "next/navigation";
import { fetchAsyncToBackEnd } from "../lib/fetchAsyncToBackEnd";

export async function uploadUserInfo(
  newName: string,
  newTFA: boolean | undefined,
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const res = await fetchAsyncToBackEnd("/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newName,
      twoFactorEnabled: newTFA,
    }),
  });
  if (res.ok) {
    setIsUploading(false);
  } else {
    console.log("Failed to update user");
  }
}
