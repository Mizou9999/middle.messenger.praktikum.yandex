import Block from "../../utils/Block";
import ChatItem from "../../components/ChatItem";

class ChatPage extends Block {
  private chatItem: ChatItem;

  constructor(props: any) {
    super("main", props);

    console.log("ChatPage constructor is being called");

    // Initialize ChatItem
    const chatItemProps = {
      userName: "John Doe",
      message: "Hello, world!",
    };
    this.chatItem = new ChatItem(chatItemProps);
  }

  compile(): HTMLElement {
    const chatContainer = document.createElement("div");
    chatContainer.classList.add("chat-container");

    const chatList = document.createElement("div");
    chatList.classList.add("chat-list");

    const chatListTitle = document.createElement("div");
    chatListTitle.classList.add("chat-list__title");
    chatListTitle.textContent = "Chats";

    const chatListItems = document.createElement("div");
    chatListItems.classList.add("chat-list__items");

    // Get content from ChatItem
    const chatItemContent = this.chatItem.getContent();

    if (chatItemContent) {
      chatListItems.appendChild(chatItemContent);
    }

    chatList.appendChild(chatListTitle);
    chatList.appendChild(chatListItems);

    const chatContent = document.createElement("div");
    chatContent.classList.add("chat-content");

    // ... add the rest of the chat content structure as needed

    chatContainer.appendChild(chatList);
    chatContainer.appendChild(chatContent);

    return chatContainer;
  }
}

export default ChatPage;
