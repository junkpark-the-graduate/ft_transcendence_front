import { Box } from "@chakra-ui/react";
import { useMyData } from "@/hooks/useMyData";
import { useFollowingList } from "@/hooks/useFollowingList";

export default function FollowingList() {
  const userData = useMyData();
  const userId = userData?.id ?? 0; // Default to 0 if `id` is undefined or null
  const followings = useFollowingList(userId);

  return (
    <Box>
      {followings &&
        followings.map((following) => (
          <div key={following}>
            <p>User ID: {following}</p>
          </div>
        ))}
    </Box>
  );
}
