import { fetchAsyncToBackEnd } from "../lib/fetchAsyncToBackEnd";

export async function checkDuplicateName(name: string) {
  try {
    const res = await fetchAsyncToBackEnd(`/user/check-name?name=${name}`, {
      method: "POST",
    });
    const data = await res.json();
    return data.isDuplicate;
  } catch (error) {
    console.error("Error checking duplicate name:", error);
    return false;
  }
}
