import { fetchAsyncToBackEnd } from "../lib/fetchAsyncToBackEnd";

export async function uploadUserImg(
  newImg: File | undefined,
  formData: FormData,
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (newImg) {
    formData.append("file", newImg);
    formData.append("filename", newImg.name);
    console.log(formData.get("filename"));
    const res = await fetchAsyncToBackEnd("/user/upload", {
      method: "PATCH",
      headers: {
        // "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
    console.log(res);
    if (!res.ok) {
      console.log("Failed to update user image");
    }
  }
}
