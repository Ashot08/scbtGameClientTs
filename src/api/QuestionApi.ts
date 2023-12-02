import BaseAPI from "./BaseApi.ts";

export interface CreateQuestionCatData {
  title: string,
  slug: string,
}

export interface DeleteQuestionCatsData {
  catsIds: number [],
}

class QuestionAPI extends BaseAPI {
  constructor() {
    super('/question');
  }

  createQuestionCat(data: CreateQuestionCatData, token: string): Promise<unknown> {
    return this.http.post('/create_cat', {...data, authorization: `Bearer ${token}`});
  }

  deleteQuestionCats(data: DeleteQuestionCatsData, token: string): Promise<unknown> {
    return this.http.post('/delete_cats', {...data, authorization: `Bearer ${token}`});
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
