import Block from "../../utils/Block";
import Handlebars from "handlebars";

import ChatItemTemplate from "./ChatItem.hbs";

const compiledTemplate = Handlebars.compile(ChatItemTemplate);

const userName = "John Doe";
const message = "Hello, world!";

const renderedTemplate = compiledTemplate({ userName, message });

console.log("Rendered template:", renderedTemplate);

// interface ChatItemProps {
//   userName: string;
//   message: string;
// }

// class ChatItem2 extends Block {
//   constructor(props: ChatItemProps) {
//     super("div", props);
//   }

//   render(): HTMLElement {
//     // Render the template using the compiled Handlebars template
//     const template = Handlebars.compile(ChatItemTemplate);
//     const html = template(this.props);

//     // Log the content to the console
//     console.log("Rendered content:", html);

//     // Create an HTML element from the rendered HTML
//     const container = document.createElement("div");
//     container.innerHTML = html;

//     return container;
//   }
// }
const ChatItem = { name: "John", message: "Hello, world!" };

export default ChatItem;
