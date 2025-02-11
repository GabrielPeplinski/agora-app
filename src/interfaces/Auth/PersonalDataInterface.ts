interface PersonalDataInterface {
  name: string;
  email: string;
  password: string;
  new_password?: string | null;
  new_password_confirmation?: string | null;
}

export default PersonalDataInterface;
