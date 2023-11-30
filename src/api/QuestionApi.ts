import BaseAPI from "./BaseApi.ts";

export interface CreateQuestionCatData {
  title: string,
  slug: string,
}

class QuestionAPI extends BaseAPI {
  constructor() {
    super('/question');
  }

  createQuestionCat(data: CreateQuestionCatData, token: string): Promise<unknown> {
    return this.http.post('/create_cat', {...data, authorization: `Bearer ${token}`});
  }

  getQuestionsCats(token: string): Promise<unknown> {
    return this.http.get('/cats', {authorization: `Bearer ${token}`});
  }

  read = undefined;

  create = undefined;

  update = undefined;

  delete = undefined;
}

export default new QuestionAPI();
