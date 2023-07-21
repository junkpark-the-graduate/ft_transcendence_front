import { Heading, HeadingProps } from "@chakra-ui/react";

export interface BaseHeadingProps extends HeadingProps {
  text: string;
}

export default function BaseHeading({ text, ...props }: BaseHeadingProps) {
  return (
    <Heading fontFamily="DungGeunMo" size="md" mb={3}>
      {">"} {text}
    </Heading>
  );
}
