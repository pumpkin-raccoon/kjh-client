export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  profile: Profile
}

export const getDefaultUser = (): User => {
  return {
    id: '',
    email: '',
    name: '',
    role: UserRole.ROLE_NON_MEMBER,
    profile: {
      greetings: '',
      photoUrl: ''
    }
  }
}

export enum UserRole {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_GENERAL = 'ROLE_GENERAL',
  ROLE_NON_MEMBER = 'ROLE_NON_MEMBER', // temp
}

export interface Profile {
  greetings: string
  photoUrl: string
}
