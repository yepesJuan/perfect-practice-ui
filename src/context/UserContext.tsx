import { createContext, ReactNode, SetStateAction, useState } from "react";
import { UserInfo } from "firebase/auth";

interface UserContextT {
  user?: UserInfo;
  setUser?: SetStateAction<UserInfo>;
}

const UserContext = createContext<UserContextT>({});

export const UserContextProvider = (props: {children:ReactNode | ReactNode[]}) => {
  const [user, setUser] = useState<UserInfo>();
  const value = { user, setUser } as UserContextT;
  const {Provider} = UserContext;
  return (
    <Provider value={value}>
      {props.children}

    </Provider>
  )
};
