import BaseHeading from "@/ui/Typo/Heading";
import {
  Badge,
  Box,
  Divider,
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
    <Box bg="#414147" px={5} pt={3} pb={5} borderRadius={8} mt={3}>
      <BaseHeading text="Match History" size="md" mb={2} />
      <Divider mt={3} mb={4} />
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
