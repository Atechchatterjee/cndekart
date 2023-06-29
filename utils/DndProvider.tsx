"use client";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { PropsWithChildren } from "react";

export default function DnDProvider({ children }: PropsWithChildren) {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}
