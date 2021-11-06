import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { getAuth, User, onAuthStateChanged } from "firebase/auth";

interface UserContextT {
  user?: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext<UserContextT>({} as any);

export const UserContextProvider = (props: {
  children: ReactNode | ReactNode[];
}) => {
  const auth = getAuth();
  const [user, setUser] = useState<User>(auth.currentUser!);
  const value = { user, setUser } as UserContextT;
  const { Provider } = UserContext;
  onAuthStateChanged(auth, (u) => setUser(u!));
  return <Provider value={value}>{props.children}</Provider>;
};
