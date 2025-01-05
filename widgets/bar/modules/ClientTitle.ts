import { Capatilize } from "utils";
const hyprland = await Service.import("hyprland");

export default () =>
  Widget.Box({
    class_name: "client-title",
    children: [
      Widget.Label({
        label: "",
        css: "padding-right: 4px",
        class_name: "icon",
      }),
      Widget.Label({
        class_name: "value",
        label: hyprland.active.client
          .bind("class")
          .as((v) => Capatilize(v.replace("-", " ") ?? "")),
      }),
    ],
    setup: (self) =>
      self.hook(hyprland, () => {
        if (hyprland.active.client.title === "") {
          self.hide();
        } else self.show_all();
      }),
  });
