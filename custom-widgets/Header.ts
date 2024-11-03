export default (title: string) =>
  Widget.Box({
    name: "header",
    spacing: 2,
    children: [
      Widget.Separator({
        css: `
              margin: 6px 0; 
              margin-right: 4px;
              min-width: 3px; 
              border-radius: 1rem
            `,
      }),
      Widget.Label({ class_name: "title", label: title }),
    ],
  });
