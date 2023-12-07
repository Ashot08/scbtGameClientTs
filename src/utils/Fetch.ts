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

type headers = {'Content-Type': string, 'Authorization' ?: string};


export default class Fetch {
  static API_URL = 'http://localhost:3001';
  // static API_URL = 'http://80.90.189.247:3001';

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${Fetch.API_URL}${endpoint}`;
  }

  public get<Response>(path = '/', data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path,{
      method: Method.Get,
      data,
    });
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

    const headers: headers = {
      'Content-Type': 'application/json;charset=utf-8',
    }
    if (data.authorization) {
      headers['Authorization'] = data.authorization;
    }
    const fetchOptions: RequestInit = {
      method,
      headers,
    }

    if(method !== Method.Delete && method !== Method.Get) {
      fetchOptions.body = JSON.stringify(data);
    }

    return fetch(url, fetchOptions).then(res => res.json()).catch(e => {
      console.log(e)
    })


  }
}
