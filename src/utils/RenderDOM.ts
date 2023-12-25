import Block from "./Block";

export default function renderDOM(query: string, block: Block) {
  const root = document.querySelector(query);
  console.log("RENDER DOM !");
  if (root) {
    root.appendChild(block.getContent() as HTMLElement);
  }
  block.dispatchComponentDidMount();
  return root;
}
