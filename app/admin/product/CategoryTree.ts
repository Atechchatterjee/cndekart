import { ICategory } from "./type";

type PCategory = Pick<ICategory, "category" | "id">;

export const ROOT: PCategory = {
  id: "root",
  category: "root",
};

export class Node {
  category: PCategory = ROOT;
  children: Node[] = [];

  constructor(category: PCategory) {
    this.category = category;
    this.children = [];
  }
}

export class CategoryTree {
  root = new Node(ROOT);

  add(newCategory: PCategory, parentCategoryId: string) {
    const newCategoryNode = new Node(newCategory);
    if (parentCategoryId === "root") {
      this.root.children.push(newCategoryNode);
    } else {
      // finding the parent in the tree and adding the new category node
      const stack: Node[] = [];
      stack.push(this.root);

      while (stack.length !== 0) {
        let currentNode = stack.pop();
        if (currentNode)
          for (const child of currentNode.children) {
            if (child.category.id === parentCategoryId) {
              child.children.push(newCategoryNode);
              return;
            }
            stack.push(child);
          }
      }
    }
  }

  getChildren(categoryNode: Node) {
    return categoryNode.children;
  }

  remove(categoryNode: Node, parentCategoryId: string) {
    let currentNode = this.root;

    while (currentNode.children.length !== 0) {
      for (const child of currentNode.children) {
        if (child.category.id === parentCategoryId) {
          // child: is the parent of the categoryNode
          child.children = child.children.filter(
            (c) => c.category.id !== categoryNode.category.id
          );
          break;
        }
        currentNode = child;
      }
    }
  }
}
