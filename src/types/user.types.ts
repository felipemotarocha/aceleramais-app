interface User {
  id: string
  firstName: string
  lastName: string
  email?: string
  provider?: string
  userName: string
  profileImageUrl?: string
  wins: number
  titles: number
  podiums: number
  biography?: string
}

export default User
