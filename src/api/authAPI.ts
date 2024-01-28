import baseAPI from "./baseAPI";
import { SigninData, SignupData, User } from "../types/types";

export class AuthAPI extends baseAPI {
  constructor() {
    super("/auth");
  }

  signin(data: SigninData): Promise<Response> {
    return this.http.post("/signin", data);
  }

  signup(data: SignupData): Promise<Response> {
    return this.http.post("/signup", data);
  }

  read(): Promise<User> {
    return this.http.get("/user");
  }

  logout() {
    return this.http.post("/logout");
  }

  create = undefined;

  update = undefined;

  delete = undefined;
}

export default new AuthAPI();
