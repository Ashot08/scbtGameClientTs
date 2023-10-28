class Token {

  setToken(token: string, id: number){
    localStorage.setItem('token', JSON.stringify({
      token,
      id
    }));
  }

  getToken(){
    const token = localStorage.getItem('token');
    if(token) {
      return JSON.parse(token);
    }
  }

  removeToken(){
    localStorage.removeItem('token');
  }

}

export default new Token();
