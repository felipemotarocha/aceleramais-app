export interface EditUserDto {
  firstName: string
  lastName: string
  biography?: string
  userName: string
  profileImage?: { uri: string }
  profileImageUrl?: string
}
