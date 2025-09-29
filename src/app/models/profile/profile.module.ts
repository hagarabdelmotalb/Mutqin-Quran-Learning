export interface StudentProfile {
  id: number;
  username: string;
  name: string;
  email: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UpdateStudentProfileRequest {
  username: string;
  age: string;
  phone: string;
}
export interface StudentRoleProfile {
  id: string;
  username: string;
  email: string;
  age: string;
  points: string;
  profilePictureUrl: string | null;
  phone: string;
  role: string;
}

export interface UserSearchResponse {
  id: string;
  username: string;
  email: string;
  password?: string;
  age: string;
  phone: string;
  memorizationleveltype?: string | null;
  points: string;
  googleId?: string | null;
  provider?: string | null;
  profilePictureUrl?: string | null;
  role: string;
}
