import API, { ChatsAPI } from "../api/ChatsAPI";
import store from "../utils/Store";
import MessagesController from "./MessagesController";

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async create(title: string) {
    try {
      await this.api.create(title);
      this.fetchChats();
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async fetchChats() {
    try {
      const chats = await this.api.read();
      chats.map(async (chat) => {
        const token = await this.getToken(chat.id);
        await MessagesController.connect(chat.id, token);
      });
      store.set("chats", chats);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async addUserToChat(id: number, userId: number) {
    try {
      await this.api.addUsers(id, [userId]);
      this.getChatUsers(id);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async getChatUsers(id: number) {
    try {
      const users = await this.api.getUsers(id);
      store.set("chatUsers", users);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async delete(id: number) {
    try {
      await this.api.delete(id);
      this.fetchChats();
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async changeAvatar(avatar: FormData) {
    try {
      await this.api.addAvatar(avatar);

      this.fetchChats();
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async deleteChatUsers(id: number, userId: number) {
    try {
      await this.api.deleteUsers(id, [userId]);
      this.getChatUsers(id);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  selectChat(id: number) {
    store.set("selectedChat", id);
  }
}

export default new ChatsController();
