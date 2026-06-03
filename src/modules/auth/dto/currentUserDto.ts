export interface CurrentUserDto {
  statusCode: number;
  data: {
    user: {
      _id: string;
      fullname: string;
      email: string;
      role: string;
    };
  };
  message: string;
  success: boolean;
}