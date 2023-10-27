export enum Method {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE'
}

type Options = {
  method: Method;
  data?: any;
};

export default class Fetch {
  static API_URL = 'http://localhost:3001';

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${Fetch.API_URL}${endpoint}`;
  }

  public get<Response>(path = '/'): Promise<Response> {
    return this.request<Response>(this.endpoint + path);
  }

  public post<Response = void>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Post,
      data,
    });
  }

  public put<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Put,
      data,
    });
  }

  public patch<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Patch,
      data,
    });
  }

  public delete<Response>(path: string): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Delete,
    });
  }

  private async request<Response>(url: string, options: Options = { method: Method.Get }):
    Promise<Response> {
    const { method, data } = options;

    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    }).then(res => res.json())

  }
}
