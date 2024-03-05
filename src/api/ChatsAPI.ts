import baseAPI from "./baseAPI";
import { User, ChatInfo } from "../types/types";

export class ChatsAPI extends baseAPI {
  constructor() {
    super("/chats");
  }

  create(title: string) {
    return this.http.post("/", { title });
  }

  delete(id: number): Promise<unknown> {
    return this.http.delete("/", { chatId: id });
  }

  read(): Promise<ChatInfo[]> {
    return this.http.get("/");
  }

  getUsers(id: number): Promise<Array<User & { role: string }>> {
    return this.http.get(`/${id}/users`);
  }

  addUsers(id: number, users: number[]): Promise<User> {
    return this.http.put("/users", { users, chatId: id });
  }

  addAvatar(avatar: FormData): Promise<ChatInfo> {
    return this.http.put("/avatar", avatar);
  }

  deleteUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.delete("/users", { users, chatId: id });
  }

  async getToken(id: number): Promise<string> {
    try {
      const response = await this.http.post<{ token: string }>(`/token/${id}`);
      return response.token;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  update = undefined;
}

export default new ChatsAPI();
