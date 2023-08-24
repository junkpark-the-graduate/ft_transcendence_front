import { fetchAsyncToBackEnd } from "../lib/fetchAsyncToBackEnd";

export async function uploadUserImg(
  newImg: File | undefined,
  formData: FormData,
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (newImg) {
    formData.append("file", newImg);
    formData.append("filename", newImg.name);
    const res = await fetchAsyncToBackEnd("/user/upload", {
      method: "PATCH",
      body: formData,
    });
    if (!res.ok) {
      console.log("Failed to update user image");
    }
  }
}
