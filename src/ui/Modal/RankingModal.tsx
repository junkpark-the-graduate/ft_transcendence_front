import GameButton from "@/ui/Button/GameButton";
import getRank, { RankingObject } from "@/utils/user/getRank"; // Import RankingObject interface
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { GoTrophy } from "react-icons/go";

export default function RankingModal({ mode }: { mode: boolean }) {
  const ranking = getRank();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getTop10Rankings = (
    rankings: RankingObject[] | null | undefined
  ): RankingObject[] => {
    if (!rankings) return [];
    return rankings.slice(0, 10);
  };

  const top10Rankings = getTop10Rankings(ranking);

  return (
    <Box>
      {mode ? (
        <GameButton
          leftIcon={<GoTrophy />}
          onClick={onOpen}
          text="Weekly Ranking"
        />
      ) : (
        <Box as="button" alignItems="center" onClick={onOpen}>
          ↗
        </Box>
      )}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent
          mt={40}
          p={4}
          border="#A0A0A3 3px solid"
          boxShadow={"7px 7px black"}
          borderRadius="0"
          bg="#29292D"
        >
          <ModalHeader pt={1} pb={3} textAlign="center">
            Weekly Ranking
          </ModalHeader>
          <ModalCloseButton size="sm" m={1} />
          <ModalBody mx={4} py={6} borderTop={"#A0A0A3 1px solid"} mb={2}>
            {top10Rankings.length > 0 ? (
              <Table size="sm" variant="striped" colorScheme="whiteAlpha">
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
                      <Td>
                        <Box
                          as="button"
                          onClick={() => {
                            router.push(`/user/profile/${item.id}`);
                          }}
                        >
                          {item.name}
                        </Box>
                      </Td>
                      <Td>{item.mmr}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Text>no data</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
