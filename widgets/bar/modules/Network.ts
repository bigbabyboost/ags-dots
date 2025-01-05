import { getNetworkSpeed as speed } from "module-vars/net-speed";
const network = await Service.import("network");

const NetworkIndicator = () =>
  Widget.Box({
    spacing: 4,
    class_name: "network-indicator",
    children: [
      Widget.Icon().hook(network, (self) => {
        const icon = network[network.primary || "wired"]?.icon_name;
        self.icon = icon || "";
        self.visible = !!icon;
      }),
      Widget.Label({ class_name: "value" }).hook(speed, (self) => {
        self.label =
          speed.value.bytesIn > speed.value.bytesOut
            ? `${speed.value.in}`
            : `${speed.value.out}`;
      }),
    ],
  });

export { NetworkIndicator };
