import { bash } from "lib/utils";

const showScreenthotOpts = Variable(false);

const ScreenshotOptions = () =>
  Widget.Revealer({
    revealChild: showScreenthotOpts.bind(),
    child: Widget.Box({
      spacing: 10,
      children: [
        Widget.Button({
          on_primary_click: () => {
            bash("hyprshot -m window");
            showScreenthotOpts.value = false;
          },
          label: "󱂬  Window",
        }),
        Widget.Button({
          on_primary_click: () => {
            bash("hyprshot -m region");
            showScreenthotOpts.value = false;
          },
          label: "󰒉  Region",
        }),
      ],
    }),
  });

export default () =>
  Widget.Box({
    class_name: "buttons-grid",
    children: [
      Widget.Box({
        class_name: "container",
        vertical: true,
        setup: (self) => {
          const spacing = () => {
            if (showScreenthotOpts.value) {
              self.spacing = 10;
            } else self.spacing = 5;
          };
          self.hook(showScreenthotOpts, spacing);
        },
        children: [
          Widget.Box({
            spacing: 10,
            children: [
              Widget.Button({
                label: "  Nightlight",
                setup: (self) => {
                  const isActive = Utils.exec("pgrep wlsunset") !== "";
                  self.toggleClassName("active", isActive);

                  if (!isActive) {
                    self.on_primary_click = () =>
                      bash("wlsunset -t 3200 -T 3201");
                  }
                },
              }),
              Widget.Button().hook(showScreenthotOpts, (self) => {
                self.on_primary_click = () => {
                  showScreenthotOpts.value = !showScreenthotOpts.value;
                };

                if (showScreenthotOpts.value) {
                  self.label = "";
                  return;
                }
                self.label = "  Screenshot";
              }),
            ],
          }),
          ScreenshotOptions(),
          Widget.Box({
            spacing: 10,
            children: [
              Widget.Button({
                on_primary_click: () => bash("hyprpicker | wl-copy"),
                label: "  Pick Color",
              }),
              Widget.Button({
                on_primary_click: () => bash(""),
                label: "󱘐  Random Wall",
              }),
            ],
          }),
        ],
      }),
    ],
  });
