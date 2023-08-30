import { fetchAsyncToBackEnd } from "../lib/fetchAsyncToBackEnd";

export async function uploadUserInfo(
  newName: string,
  newTFA: boolean | undefined,
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
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
    setIsUploading(false);
  } catch (err) {
    console.log(err);
  }
}
