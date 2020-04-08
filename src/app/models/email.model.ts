export interface EmailData {
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: number;
  message?: string;
}

export interface EmailsData {
  emails: [];
  message?: string;
}
