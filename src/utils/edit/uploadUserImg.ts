import { getTokenClient } from "../auth/getTokenClient";

export async function uploadUserImg(
  newImg: File | undefined,
  formData: FormData
) {
  if (!newImg) {
    return "";
  }
  formData.append("file", newImg);
  formData.append("filename", newImg.name);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_END_POINT}/user/upload`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getTokenClient()}`,
      },
      body: formData,
    }
  );
  if (res.status === 401) {
    throw new Error("Unauthorized");
  }
  const data = await res.json();
  const imageURL: string = data.image;
  return imageURL;
}
