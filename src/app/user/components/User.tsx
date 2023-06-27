import Image from "next/image";
import { cookies } from "next/headers";

export function getToken() {
  const tokenCookie = cookies().get("accessToken");
  return tokenCookie ? tokenCookie.value : null;
}

async function getUserInfo() {
  const token = getToken();
  if (!token) {
    console.log("Access token is missing.");
    return null;
  }

  console.log("token: ", token);
  try {
    const res = await fetch(`http://back:3001/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getUserComponent() {
  const userInfo = await getUserInfo();
  console.log("user info: ", userInfo);

  if (!userInfo) {
    return null;
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Image
        src={userInfo.image}
        alt=""
        width={150}
        height={150}
        objectFit="contain"
      />
      <div style={{ marginLeft: "20px" }}>
        <h3>{userInfo.name}</h3>
        <p>{userInfo.id}</p>
        <p>{userInfo.email}</p>
      </div>
    </div>
  );
}

export default function User() {
  return getUserComponent() || <div>Loading...</div>;
}
