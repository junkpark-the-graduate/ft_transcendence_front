import BaseButton from "@/ui/Button/Button";

export const GameStartButton = () => {
  return (
    <BaseButton
      text="start game"
      size="lg"
      onClick={() => {
        console.log("game start");
      }}
    />
  );
};
