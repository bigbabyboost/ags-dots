const audio = await Service.import("audio");

const volumeIndicator = Widget.EventBox({
  class_name: "volume-indicator",
  on_primary_click: () => {
    audio.speaker.is_muted = !audio.speaker.is_muted;
  },
  child: Widget.Box({
    children: [
      Widget.Icon().hook(audio.speaker, (self) => {
        self.class_name = "icon";
        self.css = "padding-right: 6px;";
        const vol = audio.speaker.volume * 100;
        const _icon = [
          [101, "overamplified"],
          [67, "high"],
          [34, "medium"],
          [1, "low"],
          [0, "muted"],
        ].find(([threshold]) => threshold <= String(vol))?.[1];

        const icon = audio.speaker.is_muted ? "muted" : _icon;
        self.icon = `audio-volume-${icon}-symbolic`;
      }),
      Widget.Label().hook(audio.speaker, (self) => {
        self.class_name = "value";

        const vol = audio.speaker.volume * 100;
        const volume = Math.floor(vol);
        self.label = !audio.speaker.is_muted
          ? volume > 0
            ? `${volume}%`
            : "Muted"
          : "Muted";
      }),
    ],
  }),
});

export default () =>
  Widget.EventBox({
    class_name: "volume",
    child: Widget.Box({
      children: [volumeIndicator],
    }),
  });
