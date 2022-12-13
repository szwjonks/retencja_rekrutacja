import { api } from 'src/boot/axios';
import { UserDetailsApiResponse, UsersApiResponse } from 'src/types/user-data';

export const getUsersList = async () => {
  const config = {
    params: {
      per_page: 12,
    },
  };
  const usersResponse = await api.get<UsersApiResponse>('users', config);
  return usersResponse.data.data;
};

export const getUserDetails = async (id: number) => {
  const config = {
    params: {
      id,
    },
  };

  const usersResponse = await api.get<UserDetailsApiResponse>('users', config);
  return usersResponse.data.data;
};
