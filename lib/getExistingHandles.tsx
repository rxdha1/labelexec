import { SOCIAL } from "@/types/Agent";
import { ArtistRecord } from "@/types/Artist";
import { Funnel_Type } from "@/types/Funnel";

const getExistingHandles = (artist: ArtistRecord | null) => {
  if (!artist)
    return {
      twitter: "",
      spotify: "",
      tiktok: "",
      instagram: "",
    };

  const socials = artist.account_socials.filter(
    (link: SOCIAL) => link?.type !== "YOUTUBE" && link?.type !== "APPLE",
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handles: any = {};

  socials.map((social: SOCIAL) => {
    const link = social.link;
    let match = link.match(/\/\/[^/]+\/([^\/?#]+)/);
    if (social.type === Funnel_Type.SPOTIFY.toUpperCase())
      match = link.match(/\/artists\/([a-zA-Z0-9]+)\/?$/);
    handles[`${social.type.toLowerCase()}`] = match ? match[1] : "";
  });

  return handles;
};

export default getExistingHandles;
