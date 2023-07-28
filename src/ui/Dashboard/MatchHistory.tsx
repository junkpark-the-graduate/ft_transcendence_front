import BaseHeading from "@/ui/Typo/Heading";
import {
  Badge,
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { userDummyData } from "./Dashboard";

export default function UserMatchHistory() {
  return (
    <Box
      flex={1}
      px={2}
      pb={4}
      bg="#414147"
      borderRadius={8}
      mt={3}
      overflowY="auto"
    >
      <Box
        bg="#414147"
        borderBottom={"#A0A0A3 1px solid"}
        px={2}
        py={2}
        mb={4}
        borderTopRadius={8}
      >
        <BaseHeading text="Match History" />
      </Box>
      <TableContainer>
        <Table size="sm" variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th fontFamily={"DungGeunMo"}>game no.</Th>
              <Th fontFamily={"DungGeunMo"}>date</Th>
              <Th fontFamily={"DungGeunMo"}>opponent (id)</Th>
              <Th fontFamily={"DungGeunMo"}>game type</Th>
              <Th fontFamily={"DungGeunMo"}>result</Th>
            </Tr>
          </Thead>
          <Tbody>
            {userDummyData.matchHistory.map((match) => (
              <Tr key={match.id}>
                <Td>{match.id}</Td>
                <Td>{match.date}</Td>
                <Td>
                  {match.opponentName} ({match.opponentId})
                </Td>
                <Td>{match.type}</Td>
                <Td>
                  <Badge colorScheme={match.result === "win" ? "green" : "red"}>
                    {match.result}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
