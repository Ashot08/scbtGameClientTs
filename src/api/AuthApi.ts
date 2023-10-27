import BaseAPI from "./BaseApi.ts";


export interface SignUpData {
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface SignInData {
  username: string;
  password: string;
}

class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signUp(data: SignUpData): Promise<unknown> {
    return this.http.post('/signup', data);
  }

  signIn(data: SignInData): Promise<unknown> {
    return this.http.post('/login', data);
  }

  logOut(): Promise<unknown> {
    return this.http.post('/logout');
  }

  read(): Promise<unknown> {
    return this.http.get('/user');
  }

  create = undefined;

  update = undefined;

  delete = undefined;
}

export default new AuthAPI();
