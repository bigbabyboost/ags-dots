import Separator from "./Separator.ts";

const systemtray = await Service.import("systemtray");

export default () =>
  Widget.Box({
    class_name: "systray",
    setup: (self) =>
      self.hook(systemtray, () => {
        self.children = systemtray.items.map((item) =>
          Widget.Button({
            class_name: "systray-icon",
            css: "padding: 0 4px;",
            child: Widget.Icon({ icon: item.bind("icon") }),
            on_primary_click: (_, event) => item.activate(event),
            on_secondary_click: (_, event) => item.openMenu(event),
            tooltip_markup: item.bind("tooltip_markup"),
          }),
        );
        if (systemtray.bind("items").emitter.items.length > 0) {
          self.add(Separator());
        }

        self.show_all();
      }),
  });
