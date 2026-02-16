import { Role } from "@/types/rbac.type";

export type LoginType = {
  success?: boolean;
  status?: string;
  accessToken?: string;
  errors: {
    email?: string[];
    password?: string[];
    formError?: string[];
  };
};

// export type Session = {
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     role: Role;
//   };
//   accessToken: string;
//   refreshToken: string;
// };
export type Session2 = {
  user: {
    id: string;
    username: string;
    full_name: string;
    email: string;
    role: Role;
    extra_data: {
      dob?: string;
      phone_number?: string;
    };
    referral_code: string;
  };
  accessToken: string;
  refreshToken: string;
};
export type EmailSendType = {
  errors: {
    email?: string[];
    formError?: string[];
  };
  success_text?: string;
  success?: boolean;
};
export type ResetPasswordType = {
  errors: {
    new_password1?: string[];
    new_password2?: string[];
    uid?: string[];
    token?: string[];
    formError?: string[];
  };
  success?: boolean;
};

export type resetPasswordProps = {
  params: {
    uid: string;
    token: string;
  };
};
