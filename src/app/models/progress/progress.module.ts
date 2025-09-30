export interface NotificationUser {
  id: string;
  username: string;
  email: string;
  password: string;
  age: string;
  phone: string;
  memorizationleveltype: string | null;
  points: string;
  googleId: string | null;
  provider: string | null;
  profilePictureUrl: string | null;
  role: string;
}

export interface NotificationData {
  id: string;
  message: string;
  user: NotificationUser;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationResponse {
  data: NotificationData[];
  message?: string;
}
