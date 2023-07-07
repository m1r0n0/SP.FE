export interface IUser {
  userId: string;
  userEmail: string;
}

export interface ILoginUser {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ILoginUserResponse {
  email: string;
  password: string;
  rememberMe: boolean;
  userId: string;
}

export interface IRegisterUser {
  email: string;
  password: string;
}

export interface IUserEmail {
  newEmail: string;
}

export interface IUserPassword {
  newPassword: string;
}

export interface IAuthorizationBadRequestResponse {
  email: string;
  result: {
    succeeded: boolean;
    errors: IIdentityAuthorizationError[];
  };
}

export interface IIdentityAuthorizationError {
  code: string;
  description: string;
}
