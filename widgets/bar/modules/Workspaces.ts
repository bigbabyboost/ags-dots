const hyprland = await Service.import("hyprland");

const dispatch = (ws: string | number) =>
  hyprland.messageAsync(`dispatch workspace ${ws}`);

export default () =>
  Widget.EventBox({
    onScrollUp: () => dispatch("+1"),
    onScrollDown: () => dispatch("-1"),
    child: Widget.Box({
      class_name: "workspaces",
      children: Array.from({ length: 5 }, (_, i) => i + 1).map((i) =>
        Widget.Button({
          attribute: i,
          class_name: "default",
          onClicked: () => dispatch(i),
        }),
      ),

      setup: (self) => {
        self.hook(hyprland, () =>
          self.children.forEach((btn, _) => {
            const isActive = hyprland.active.workspace.id === btn.attribute;
            const isOccupied =
              (hyprland.getWorkspace(btn.attribute)?.windows || 0) > 0;

            btn.toggleClassName("active", isActive);
            btn.toggleClassName("occupied", isOccupied && !isActive);
          }),
        );
      },
    }),
  });
