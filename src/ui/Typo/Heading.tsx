import { Heading, HeadingProps } from "@chakra-ui/react";

export interface BaseHeadingProps extends HeadingProps {
  text: string;
}

export default function BaseHeading({ text, ...props }: BaseHeadingProps) {
  return (
    <Heading fontFamily="DungGeunMo" fontWeight="800" size="sm">
      {text}
    </Heading>
  );
}
