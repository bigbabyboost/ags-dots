import type { Binding } from "types/service";

type FallbackProps = {
  iconType?: "label" | "icon";
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  icon: string | Binding<any, any, string>;
  iconSize?: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  label?: string | Binding<any, any, string>;
};

export const Fallback = ({
  iconType = "icon",
  iconSize = 42,
  icon,
  label,
}: FallbackProps) => {
  const size = `font-size: ${iconSize}`;

  const _icon =
    iconType === "icon"
      ? Widget.Icon({ icon: icon, css: size })
      : Widget.Label({ label: icon, css: size });

  const _label = Widget.Label({ label: label });

  return Widget.CenterBox({
    name: "fallback",
    vertical: true,
    hexpand: true,
    vexpand: true,
    centerWidget: Widget.Box({
      vertical: true,
      spacing: 10,
      children: [_icon, _label],
    }),
  });
};
