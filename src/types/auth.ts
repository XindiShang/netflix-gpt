export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
