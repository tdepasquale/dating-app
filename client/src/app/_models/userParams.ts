import { IUser } from './user';

export class UserParams {
  gender: string | undefined;
  minAge = 18;
  maxAge = 99;
  pageNumber = 1;
  pageSize = 5;

  constructor(user: IUser) {
    this.gender = user.gender === 'female' ? 'male' : 'female';
  }
}
