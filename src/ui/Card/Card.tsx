import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardProps,
} from "@chakra-ui/react";

export interface BaseCardProps extends CardProps {}

export default function BaseCard({ children, ...props }: BaseCardProps) {
  return (
    <Card
      bg="#29292D"
      pos="relative"
      align="center"
      variant="filled"
      fontFamily="futura"
      borderRadius="12px"
      p="10px 30px"
    >
      {children}
    </Card>
  );
}
