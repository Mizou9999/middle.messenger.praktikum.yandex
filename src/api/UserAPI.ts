import BaseAPI from "./BaseAPI";

export class UserAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  public create?(): Promise<unknown> {
    throw new Error("Method not implemented.");
  }

  public read?(): Promise<unknown> {
    throw new Error("Method not implemented.");
  }

  public update?(): Promise<unknown> {
    throw new Error("Method not implemented.");
  }

  public delete?(): Promise<unknown> {
    throw new Error("Method not implemented.");
  }

  updateAvatar(avatar: FormData) {
    return this.http.put("/profile/avatar", avatar);
  }

  changeProfile(profile: {}) {
    return this.http.put("/profile", profile);
  }
}

export default new UserAPI();
