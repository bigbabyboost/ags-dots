import type { TrayItem } from "types/service/systemtray";

const systemtray = await Service.import("systemtray");
const ignoreList = ["KDE Connect Indicator"];

const SysTrayItem = (item: TrayItem) =>
  Widget.Button({
    class_name: "systray-icon",
    css: "padding: 0 4px;",
    child: Widget.Icon().hook(systemtray, (self) => {
      if (item.title === "TelegramDesktop") {
        self.icon = "org.telegram.desktop";
        self.class_name = "systray-icon custom";
      } else {
        self.icon = item.icon;
        self.class_name = "systemtray-icon";
      }
    }),
    on_primary_click: (_, event) => item.activate(event),
    on_secondary_click: (_, event) => item.openMenu(event),
    tooltip_markup: item.bind("tooltip_markup"),
  });

export default () =>
  Widget.Box({
    class_name: "systray",
    setup: (self) =>
      self.hook(systemtray, () => {
        const trayItems = systemtray.items
          .filter(({ id }) => id && !ignoreList.includes(id))
          .map(SysTrayItem);
        self.children = trayItems;

        if (trayItems.length > 0) {
          self.show_all();
        } else self.hide();
      }),
  });
