import Paragraph from "@tiptap/extension-paragraph";

export const CustomParagraph = Paragraph.extend({
  addAttributes() {
    return {
      size: {
        default: null,
        renderHTML: () => {
          return {
            style: `font-size: 1.15rem`,
          };
        },
      },
    };
  },
});
