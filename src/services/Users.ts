import api from './api';

const namespace = 'users';

interface IUser {
  username: string;
}
export default class Users {
  static async getUser({ username }: IUser) {
    return api
      .get(`${namespace}/${username}`)
      .then(async (response) => {
        if (response.status) {
          return {
            data: response.data,
            ok: true,
          };
        }
        return {
          ok: false,
          data: [],
        };
      })
      .catch((error) => ({
        ok: false,
        data: [],
      }));
  }

  static async getRepos({ username }: IUser) {
    return api
      .get(`${namespace}/${username}/repos`)
      .then(async (response) => {
        if (response.status) {
          return {
            data: response.data,
            ok: true,
          };
        }
        return {
          ok: false,

          data: [],
        };
      })
      .catch((error) => ({
        ok: false,
        data: [],
      }));
  }

  static async getStarred({ username }: IUser) {
    return api
      .get(`${namespace}/${username}/starred`)
      .then(async (response) => {
        if (response.status) {
          return {
            data: response.data,
            ok: true,
          };
        }
        return {
          ok: false,
          data: [],
        };
      })
      .catch((error) => ({
        ok: false,
        data: [],
      }));
  }
}
