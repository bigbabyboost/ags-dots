import type { ButtonProps } from "types/widgets/button";

interface CustomButtonProps extends ButtonProps {
  iconType: "icon" | "text";
  label: string;
  icon: string;
}

export const CustomButton = (props: Partial<CustomButtonProps>) => {
  const { iconType = "icon", label, icon, ...buttonAttrs } = props;

  const Icon =
    iconType === "icon" ? Widget.Icon({ icon }) : Widget.Label({ label: icon });
  const Label = Widget.Label({ label });

  const centerbox = Widget.CenterBox({
    class_name: "custom-button",
    centerWidget: Widget.Box({
      setup: (self) => {
        self.spacing = iconType === "icon" ? 6 : 10;
        const widgets = icon ? [Icon, Label] : [Label];
        self.children = widgets;
      },
    }),
  });

  return Widget.Button({
    ...buttonAttrs,
    child: centerbox,
  });
};
