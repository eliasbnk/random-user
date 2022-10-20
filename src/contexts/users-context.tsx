import React, { createContext, useContext, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import axios from 'axios';
import { DataType, Result } from 'types/global';

interface UserContextType {
  userData: Result[];
  fetchUserData: () => Promise<void>;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextType>({
  userData: [] as any,
  fetchUserData: {} as any,
  isLoading: false,
});
const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<DataType>(
        'https://randomuser.me/api/?results=10',
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );
      if (userData === undefined) return;
      else if (userData?.length === 0) return setUserData(data.results);
      else {
        return setUserData((prevState) => [...data.results, ...prevState]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  },[]);

  const context = {
    userData,
    fetchUserData,
    isLoading,
  };
  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};
export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};

export default UserContextProvider;
