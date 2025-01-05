import type { MprisPlayer } from "types/service/mpris";

const mpris = await Service.import("mpris");

const Player = ({ track_artists, track_title }: Partial<MprisPlayer>) => {
  const title = Widget.Label({
    class_name: "title",
    max_width_chars: 16,
    truncate: "end",
    wrap: true,
    label: track_title?.replace(/\[.*?\]|\(.*?\)|\{.*?\}/g, "").trim(),
  });

  const artist = Widget.Label({
    class_name: "artist",
    max_width_chars: 16,
    truncate: "end",
    wrap: true,
    label: `- ${track_artists?.join(", ")}`,
    setup: (self) =>
      self.hook(
        mpris,
        () =>
          track_artists?.filter((i) => i !== "").length === 0 && self.hide(),
      ),
  });

  return Widget.Box({
    spacing: 6,
    class_name: "media-info",
    children: [Widget.Label("󰎇"), title, artist],
  });
};

export default () =>
  Widget.Box({
    class_name: "media",
    child: Widget.Button().hook(mpris, (self) => {
      const player =
        mpris.getPlayer("spotify") ||
        mpris.getPlayer("tauon") ||
        mpris.getPlayer() ||
        null;

      if (!player) return;

      // Player controls
      self.on_primary_click = player.playPause;
      self.on_scroll_down = player.next;
      self.on_scroll_up = player.previous;

      self.class_name = player.play_back_status.toLowerCase();

      const { name, track_artists, track_title, play_back_status } = player;

      if (play_back_status !== "Stopped") {
        self.child = Player({
          name: name,
          track_artists: track_artists,
          track_title: track_title,
          play_back_status: play_back_status,
        });
      } else {
        self.child = Widget.Label({
          label: "",
        });
      }
    }),
    setup: (self) =>
      self.hook(mpris, () => {
        if (mpris.players.length === 0) {
          self.hide();
        } else {
          self.show();
        }
      }),
  });
