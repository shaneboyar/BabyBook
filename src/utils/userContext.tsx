import { createContext } from 'react';
export interface LocalUserData {
  id?: number;
  uuid?: string;
  name?: string;
  setUser?({ name, uuid }): void;
}

const UserContext = createContext({} as LocalUserData);
UserContext.displayName = 'UserContext';

export { UserContext };
