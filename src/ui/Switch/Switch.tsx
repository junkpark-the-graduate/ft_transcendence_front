import { Switch, SwitchProps } from "@chakra-ui/react";

export interface BaseSwitchProps extends SwitchProps {
  text: string;
}

export default function BaseSwitch({
  text,
  onChange,
  ...props
}: BaseSwitchProps) {
  return <Switch>{text}</Switch>;
}
