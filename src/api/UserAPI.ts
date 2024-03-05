import baseAPI from "./baseAPI";
export interface User {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}
export class UserAPI extends baseAPI {
  constructor() {
    super("/user");
  }

  public async changeUserData(data: User) {
    try {
      return await this.http.put("/profile", data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async changeUserAvatar(data: FormData) {
    try {
      return await this.http.put("/profile/avatar", data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // public async changeUserPassword(data: UserPasswordData) {
  //   return await this.http.put('/password', { data });
  // }

  // public async getUser(data: User) {
  //   return await this.http.get(`/${data.id}`);
  // }
}

export default new UserAPI();
