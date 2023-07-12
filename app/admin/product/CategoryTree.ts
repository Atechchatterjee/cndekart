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
    console.log("category node: ", category.category, " has been created");
    this.category = category;
    this.children = [];
  }
}

export class CategoryTree {
  root = new Node(ROOT);

  add(newCategory: PCategory, parentCategoryId: string) {
    console.log("adding categories");
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
    const stack: Node[] = [];
    stack.push(this.root);

    while (stack.length !== 0) {
      let currentNode = stack.pop();
      if (currentNode)
        for (const child of currentNode.children) {
          if (child.category.id === parentCategoryId) {
            // child: is the parent of the categoryNode
            const newChildren = child.children.filter(
              (c) => c.category.id !== categoryNode.category.id
            );
            child.children = newChildren;
            break;
          }
          stack.push(child);
        }
    }
  }
}
