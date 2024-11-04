const home = `/home/${Utils.exec("whoami")}`;

export const options = {
  quicksettings: {
    profile_picture:
      "https://ik.imagekit.io/rayshold/gallery/lofi-anime-boy_863013-93642.avif",
    screenshot: {
      path: `${home}/Pictures/screenshots`,
    },
    random_wall: {
      path: `${home}/Pictures/wallpapers`,
    },
  },
  mpris: {
    fallback_img: "https://ik.imagekit.io/rayshold/gallery/mpris-fallback.webp",
  },
  wallpaper_picker: {
    path: `${home}/.config/swww/compressed-walls`,
  },
};
