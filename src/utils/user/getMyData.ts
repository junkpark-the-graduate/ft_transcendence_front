import { fetchAsyncToBackEnd } from "../lib/fetchAsyncToBackEnd";

export async function getMyData() {
  try {
    const res = await fetchAsyncToBackEnd(`/user`);
    const fetchedUserData = await res.json();

    return fetchedUserData;
  } catch (err) {
    console.log(err);
  }
  return null;
}
