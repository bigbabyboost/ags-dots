import { bash } from "lib/utils";
import { options } from "options";

const SCREENSHOT_PATH = options.quicksettings.screenshot.path;

const Button = (icon: string, func: () => void) =>
  Widget.Button({
    on_primary_click: func,
    child: Widget.Label({ label: icon }),
  });

export default Widget.Box({
  class_name: "quickaccess-buttons",
  spacing: 15,
  children: [
    Button("", () => App.toggleWindow("wallpapers")),
    Button("", () =>
      bash(`hyprshot -m region --output-folder ${SCREENSHOT_PATH}`),
    ),
  ],
});
