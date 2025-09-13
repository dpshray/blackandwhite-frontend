export interface UserProfile {
  name: string;
  phone_number: string;
  profile_image: string;
  gender: "male" | "female" | "other" | string;
  date_of_birth: string; 
}

export interface UserProfileResponse {
  message: string;
  data: UserProfile;
  success: boolean;
}
