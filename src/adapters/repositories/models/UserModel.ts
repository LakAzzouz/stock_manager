export interface UserModel {
  id: string;
  username: string;
  email: string;
  password: string;
  birth_date: Date;
  is_verified: boolean;
  reset_password_code?: string;
  verify_email_code: string;
  created_at: Date;
  updated_at?: Date;
}
