import { bash } from "lib/utils";
import { nightlight } from "./nightlight";

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
                on_primary_click: () => nightlight.toggle(),
              }).hook(nightlight.service, (self) =>
                self.toggleClassName("active", nightlight.service.value),
              ),
              Widget.Button().hook(showScreenthotOpts, (self) => {
                self.on_primary_click = () => {
                  showScreenthotOpts.value = !showScreenthotOpts.value;
                };

                if (showScreenthotOpts.value) {
                  self.label = "";
                  return;
                }
                self.label = "  Screenshot";
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
                on_primary_click: () =>
                  Utils.exec("bash -c '$HOME/.config/ags/scripts/randwall.sh'"),
                label: "  Random Wall",
              }),
            ],
          }),
        ],
      }),
    ],
  });
