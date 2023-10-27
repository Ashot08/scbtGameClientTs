import AuthAPI, {SignInData} from "../api/AuthApi.ts";

class AuthController {
  async login(payload: SignInData) {
    try {
      const user: any = await AuthAPI.signIn(payload);
      if(!user.token){
        console.log('no user', user);
        return;
      }
      alert(user.token);
    } catch (e) {
      console.log(e);
    }
  }

  // async signup(req: any, res: any) {
  //   try {
  //     const validationErrors = validationResult(req);
  //
  //     if (!validationErrors.isEmpty()) {
  //       return res.status(400).json({ message: 'Ошибка при валидации данных', validationErrors });
  //     }
  //
  //     const { username, password } = req.body;
  //     const alreadyExistUser = await User.read({ username });
  //
  //     if (alreadyExistUser?.id) {
  //       return res.json({ message: 'Пользователь уже существует' });
  //     }
  //
  //     const hashPassword = bcrypt.hashSync(password, 5);
  //     const user = {...req.body, password: hashPassword};
  //
  //     const result: RunResult = await User.create(user);
  //
  //     if (result.lastID) {
  //       const token = generateAccessToken(result.lastID);
  //       return res.json({ message: 'Пользователь успешно зарегистрирован', result, token });
  //     }
  //   } catch (e) {
  //     return res.status(400).json({ message: 'Registration error' });
  //   }
  // }

}

export default new AuthController();
