export * from './props';
export interface RouteConfigSpec {
  path: string;
  component: any;
  exact: boolean;
}

export interface Badge {
  name: string;
  description?: string;
  icon?: string;
}

type AccountStatus = 'activated' | 'not-active' | 'blocked';

export interface UserMetaContextProps {
  fullname: string;
  username: string;
  email: string;
  profilePicture: string | null;
  subjects: string[];
  role: string;
  school: string;
  gradeLevel: number | null;
  accountStatus: AccountStatus;
}

export interface ClaimPayload {
  fullname: string;
  username: string;
  email: string;
  role: string;
  profilePicture: string | null;
  subjects: string[];
  school: string;
  gradeLevel: number | null;
  accountStatus: AccountStatus;
}
export interface Auth0Extended {
  'https://hasura.io/jwt/claims/profile': ClaimPayload;
}
