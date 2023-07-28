import BaseHeading from "@/ui/Typo/Heading";
import getRank, { RankingObject } from "@/utils/user/getRank"; // Import RankingObject interface
import {
  Box,
  Center,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

export default function Ranking() {
  const ranking = getRank();

  // Helper function to get the top 10 rankings
  const getTop10Rankings = (
    rankings: RankingObject[] | null | undefined
  ): RankingObject[] => {
    if (!rankings) return []; // Return empty array if rankings are undefined
    return rankings.slice(0, 10); // Return the first 10 elements (top 10 rankings)
  };

  const top10Rankings = getTop10Rankings(ranking);

  return (
    <Box px={2} pb={4} bg="#414147" borderRadius={8}>
      <Box
        bg="#414147"
        borderBottom={"#A0A0A3 1px solid"}
        px={2}
        py={2}
        mb={2}
        borderTopRadius={8}
      >
        <BaseHeading fontSize={20} textAlign="center" text="weekly ranking" />
      </Box>
      {top10Rankings.length > 0 ? (
        <Table size="sm" variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th fontFamily={"DungGeunMo"}>rank</Th>
              <Th fontFamily={"DungGeunMo"}>id</Th>
              <Th fontFamily={"DungGeunMo"}>name</Th>
              <Th fontFamily={"DungGeunMo"}>MMR</Th>
            </Tr>
          </Thead>
          <Tbody>
            {top10Rankings.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.id}</Td>
                <Td>{item.name}</Td>
                <Td>{item.mmr}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Text>No rankings available.</Text>
      )}
    </Box>
  );
}
