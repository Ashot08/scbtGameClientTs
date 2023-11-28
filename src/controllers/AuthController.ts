import AuthAPI, {SignInData, SignUpData} from "../api/AuthApi.ts";
import Token from "../utils/Token.ts";


class AuthController {

  async login(payload: SignInData) {

    try {
      const user: any = await AuthAPI.signIn(payload);
      if(!user.token){
        return {
          token: null,
          text: user.message,
          status: 'error',
        };
      }
      return {
        token: user.token,
        text: 'Вы успешно авторизованы',
        status: 'success',
        username: user.username,
        email: user.email,
        name: user.name,
        id: user.id
      }

    } catch (e) {
      return {token: null, text: 'Login Error', status: 'error'}
    }
  }

  async signup(payload: SignUpData) {
    try {
      //return res.status(400).json({ message: 'Ошибка при валидации данных', validationErrors });
      const response: any = await AuthAPI.signUp(payload);

      if(response.validationErrors){
        return {token: null, text: 'Registration error', status: 'error', errors: response.validationErrors.errors}
      }

      if(!response.token) {
        return {token: null, text: response.message, status: 'error'}
      }

      if(response.result.lastID) {
        return {token: response.token, id: response.result.lastID, text: response.message, status: 'success'}
      }
      return {token: null, text: 'Registration error', status: 'error'}
    } catch (e) {
      return {token: null, text: 'Registration error', status: 'error'}
    }
  }

  async fetchUser() {
    try {
      const token = Token.getToken();

      if(token.token) {

        const response: any = await AuthAPI.read(token.id, token.token);

        if(response.user.id){
          return {text: 'Get User Success', status: 'success', user: response.user};
        }
      }

      return {text: 'Get User Error', status: 'error'};
    } catch (e) {
      return {text: 'Get User Error', status: 'error'}
    }
  }
}

export default new AuthController();
