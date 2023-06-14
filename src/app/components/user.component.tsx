import Image from "next/image";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjk4MjYwLCJpYXQiOjE2ODY3MTUzODAsImV4cCI6MTY4NjcxODk4MH0.grrqvtzJRItuO4P9QDaKG_bdtpVCKFbJkWtpyHKMb0o";

async function getUserInfo() {
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
  }
}

export default async function User() {
  const userInfo = await getUserInfo();

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Image
        src={userInfo.image}
        alt=""
        width={100}
        height={100}
        objectFit="contain"
      />
      <div style={{ marginLeft: "20px" }}>
        <h3>{userInfo.name}</h3>
        <p>{userInfo.ftId}</p>
        <p>{userInfo.email}</p>
      </div>
    </div>
  );
}
