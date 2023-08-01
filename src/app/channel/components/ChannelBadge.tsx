import { Badge } from "@chakra-ui/react";
import { EChannelType } from "../types/EChannelType";

export default function ChannelBadge({ type }: { type: number }) {
  const strType = EChannelType[type];
  return (
    <Badge
      colorScheme={
        strType === "public"
          ? "blue"
          : strType === "protected"
          ? "green"
          : "red"
      }
      fontSize="xs"
    >
      {strType}
    </Badge>
  );
}
