export interface UserRowFromApi {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserRow extends UserRowFromApi {
  favourite: boolean;
}

export interface UsersApiResponse {
  data: UserRowFromApi[];
}
