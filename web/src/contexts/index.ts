import React from 'react';
import { UserMetaContextProps } from '../interfaces';

export type UserMetaContextType = Partial<UserMetaContextProps>;

export const UserMetaContext = React.createContext<UserMetaContextType>({});
