interface IUserResponseDTO {
  email: string;
  name: string;
  id: string;
  avatar: string;
  driver_license: string;
  is_active: boolean;

  avatar_url(): string;
}

export { IUserResponseDTO };
