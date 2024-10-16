const network = await Service.import("network");

const NetworkIndicator = () =>
  Widget.Box({
    children: [
      Widget.Icon().hook(network, (self) => {
        const icon = network[network.primary || "wired"]?.icon_name;
        self.icon = icon || "";
        self.visible = !!icon;
        self.class_name = "network-indicator";
      }),
    ],
  });

export { NetworkIndicator };
