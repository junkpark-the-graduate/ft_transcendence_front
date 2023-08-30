import { Badge, BadgeProps } from "@chakra-ui/react";
import { EChannelType } from "../../app/(chat)/channel/types/EChannelType";

export interface ChannelBadgeProps extends BadgeProps {
  type: number;
}

export default function ChannelBadge({ type, ...props }: ChannelBadgeProps) {
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
      {...props}
    >
      {strType}
    </Badge>
  );
}
