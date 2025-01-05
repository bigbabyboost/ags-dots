import { opt } from "lib/options";
import { date } from "widgets/bar/modules/Clock";

const format = opt("%b-%d-%a");

const currentDate = Utils.derive([date, format], (c, f) => c.format(f) || "");

const calendar = Widget.Box({
  class_name: "container",
  css: "border-radius: 8px; padding: 0px 4px;",
  child: Widget.Calendar({ hexpand: true, css: "padding-top: 4px;" }),
});

const getCharArray = (str: string): string[] => {
  return str.toUpperCase().split("");
};

const DateWidget = () => {
  const text = Widget.Box({
    class_name: "container",
    css: "border-radius: 8px;",
    child: Widget.Overlay({
      vpack: "center",
      child: Widget.Box({
        css: "min-width: 28px;",
        vertical: true,
        child: Widget.Label({
          class_name: "char",
          label: currentDate.bind().as((value) =>
            getCharArray(value.toString())
              .map((c) => (c === "-" ? "" : c))
              .join("\n"),
          ),
        }),
      }),
      overlay: Widget.Label({
        class_name: "separator",
        css: "opacity: 1;",
        label: currentDate.bind().as((value) =>
          getCharArray(value.toString())
            .map((c) => (c !== "-" ? "" : c))
            .join("\n"),
        ),
      }),
    }),
  });

  return Widget.Box({
    class_name: "date-widget",
    homogeneous: true,
    vertical: true,
    spacing: 6,
    child: text,
  });
};

export default () =>
  Widget.Box({
    className: "calendar",
    css: "border-radius: 8px;",
    spacing: 6,
    children: [DateWidget(), calendar],
  });
