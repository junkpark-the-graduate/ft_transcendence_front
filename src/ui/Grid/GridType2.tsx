import { Grid, GridItem, GridProps } from "@chakra-ui/react";
import NavBar from "@/ui/NavBar/NavBar";
import FullBox from "../Box/FullBox";
import { UserDataContextProvider } from "@/context/UserDataContext";
import { RelationContextProvider } from "@/context/RelationContext";

export interface GridType2Props extends GridProps {
  children: React.ReactNode;
}

export default function GridType2({ children, ...props }: GridType2Props) {
  return (
    <UserDataContextProvider>
      <RelationContextProvider>
        <FullBox>
          <NavBar />
          <Grid
            gridTemplateColumns={"repeat(3, 1fr)"}
            w="full"
            h="93%"
            color="white"
            fontWeight="bold"
            borderRadius="8px"
            {...props}
          >
            <GridItem
              bg="#29292D"
              colSpan={3}
              px={5}
              my={2}
              py={3}
              borderRadius="8px"
            >
              {children}
            </GridItem>
          </Grid>
        </FullBox>
      </RelationContextProvider>
    </UserDataContextProvider>
  );
}
