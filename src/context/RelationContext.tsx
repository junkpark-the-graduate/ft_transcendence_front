import React, { ReactNode } from "react";

type RelationContextType = {
  isFollowing: boolean;
  setIsFollowing: (value: boolean) => void;
  isBlocking: boolean;
  setIsBlocking: (value: boolean) => void;
};

const RelationContext = React.createContext<RelationContextType>({
  isFollowing: false,
  setIsFollowing: () => {},
  isBlocking: false,
  setIsBlocking: () => {},
});

export const useRelationContext = () => React.useContext(RelationContext);

export const RelationContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [isBlocking, setIsBlocking] = React.useState(false);

  return (
    <RelationContext.Provider
      value={{ isFollowing, setIsFollowing, isBlocking, setIsBlocking }}
    >
      {children}
    </RelationContext.Provider>
  );
};
