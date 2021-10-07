import type { User } from './models';

export const transformToUser = (u: User) => {
  const { id, info } = u;
  return {
    id,
    info,
  };
};
