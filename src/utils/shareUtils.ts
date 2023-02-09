import { Platform, Share } from "react-native";

type sharePostsProps = {
  message?: string;
  url: string;
};

type shareMediaProps = {
  message?: string;
  url: string;
};

export const sharePosts = async ({ message, url }: sharePostsProps) => {
  if (message === undefined)
    message =
      "Rejoignez-nous sur SediSpace: Un réseau pour le monde mais surtout pour notre continent africain alors venez nous rejoindre sur SEDISPACE .";

  if (Platform.OS === "android") {
    message += " " + url;
  }
  return await Share.share(
    {
      message,
      url,
    },
    { dialogTitle: "Partager Le Post" }
  );
};

export const shareMedia = async ({ message, url }: shareMediaProps) => {
  if (message === undefined)
    message =
      "Rejoignez-nous sur SediSpace: Un réseau pour le monde mais surtout pour notre continent africain alors venez nous rejoindre sur SEDISPACE .";

  return await Share.share({
    message,
    url,
  });
};
