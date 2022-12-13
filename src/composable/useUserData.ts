import { useStorage } from '@vueuse/core';
import { UserRowFromApi, UserRow } from 'src/types/user-data';

export default function useUserData() {
  const favourites = useStorage<Record<number, boolean>>('favourites', {});

  const mapToUserData = (userDataApi: UserRowFromApi) => ({
    ...userDataApi,
    name: `${userDataApi.first_name} ${userDataApi.last_name}`,
    favourite: favourites.value[userDataApi.id] || false,
  });

  const changeFavouriteState = (row: UserRow, value: boolean) => {
    favourites.value[row.id] = value;
  };

  return {
    mapToUserData,
    changeFavouriteState,
  };
}
