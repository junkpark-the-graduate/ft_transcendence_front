import BaseHeading from "@/ui/Typo/Heading";
import { Box, Center, Divider, Text, Textarea } from "@chakra-ui/react";

export default function GameDesciption() {
  return (
    <Box px={2} pb={4} bg="#414147" borderRadius={8}>
      <Box
        bg="#414147"
        borderBottom={"#A0A0A3 1px solid"}
        px={2}
        py={2}
        mb={4}
        borderTopRadius={8}
      >
        <BaseHeading fontSize={20} textAlign="center" text="how to play" />
      </Box>
      <Box px={4} fontSize={14} fontWeight={200} textAlign="justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer maximus
        mauris turpis, nec rutrum massa mattis vel. Sed felis nulla, dignissim a
        suscipit vel, tempor vitae risus. Proin at dui ut felis congue rhoncus
        sed nec nibh. Nam fringilla quam aliquam massa egestas, eu lacinia erat
        sodales. Morbi pharetra molestie enim, at posuere risus accumsan vitae.
        Donec interdum sem a arcu accumsan, sodales bibendum purus luctus. Sed
        pellentesque orci sodales blandit imperdiet. Nulla non massa pharetra,
        feugiat lorem ullamcorper, ultricies velit.
      </Box>
    </Box>
  );
}
