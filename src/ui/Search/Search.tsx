import { SearchIcon } from "@chakra-ui/icons";
import BaseIconButton from "../Button/IconButton";

export default function Search() {
  return <BaseIconButton icon={<SearchIcon />} aria-label="search" mr={3} />;
}
