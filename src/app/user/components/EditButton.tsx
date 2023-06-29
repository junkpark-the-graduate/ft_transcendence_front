"use client";
import { useRouter } from "next/navigation";

export default function EditButton() {
  const router = useRouter();

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => {
        router.push("/user/edit");
      }}
    >
      Edit Profile
    </button>
  );
}

// import { Flex, Text, Switch, Spacer, Button } from "@chakra-ui/react";
// import { useRouter } from "next/navigation";

// export default function EditButton() {
//   const router = useRouter();

//   return (
//     <Button
//       size={"sm"}
//       onClick={() => {
//         router.push("/user/edit");
//       }}
//     >
//       Edit Profile
//     </Button>
//   );
// }
