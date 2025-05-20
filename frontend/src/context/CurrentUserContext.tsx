import React from "react";

interface User {
  login: string;
  email: string;
  registrationDate: Date | undefined;
  _id: string;
}

interface CurrentUserContextProps {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export const CurrentUserContext = React.createContext<CurrentUserContextProps>({
  currentUser: null,
  setCurrentUser: () => {},
});
