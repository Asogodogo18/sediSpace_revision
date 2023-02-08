import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as VideoThumbnails from "expo-video-thumbnails";
import { AntDesign } from "@expo/vector-icons";

import { MediaType } from "../../types/global";
import Box from "./Box";
import { MEDIA_URL } from "../../constants/api-constants";

type MediaProps = {
  media: MediaType;
  single?: boolean;
  toggleModal?: Function;
  expanded?: boolean;
  setCurrentMedia?: React.Dispatch<React.SetStateAction<null>>;
};

const mediaWidth = 110;
const mediaHeight = 110;

const Media: React.FC<MediaProps> = ({
  media,
  single,
  toggleModal,
  expanded = false,
  setCurrentMedia,
}) => {
  const mediaRef = useRef(null);
  const [status, setStatus] = useState({});
  const [videoThumb, setVideoThumb] = useState("");

  const onPress = () => {
    if (!expanded) setCurrentMedia(media);
    mediaRef.current.measureInWindow((x, y, _width, _height) => {
      toggleModal({
        x,
        y,
        _width,
        _height,
      });
    });
  };

  useEffect(() => {
    const generateThumbnail = async () => {
      try {
        const { uri } = await VideoThumbnails.getThumbnailAsync(media.url, {
          time: 1000,
        });
        setVideoThumb(uri);
      } catch (e) {}
    };
    if (media.type === "video") generateThumbnail();
    return () => {
      setVideoThumb("");
    };
  }, []);
  if (media.type === "video") {
    return (
      <TouchableOpacity
        onPress={expanded ? () => {} : onPress}
        style={[
          {
            margin: 2,
          },
          single || expanded
            ? { width: "100%", justifyContent: "center", alignItems: "center" }
            : null,
        ]}
      >
        {!expanded ? (
          <Box
            flex={1}
            zIndex={100}
            position={"absolute"}
            left={0}
            right={0}
            top={0}
            bottom={0}
            alignItems={"center"}
            justifyContent={"center"}
            backgroundColor={"overlay2"}
            borderRadius={8}
          >
            <AntDesign name="playcircleo" size={48} color="white" />
          </Box>
        ) : null}
        {expanded ? (
          <Video
            ref={mediaRef}
            style={{ margin: 5, width: 300, height: 150, zIndex: 10 }}
            resizeMode={ResizeMode.COVER}
            source={{
              uri: MEDIA_URL + media.src,
            }}
            useNativeControls
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        ) : (
          <Image
            ref={mediaRef}
            source={{
              uri:
                videoThumb ||
                "https://imgs.search.brave.com/8P-l_j0IGV7EhEtx7Udj_9rhuifz_4bFiwUR_8ZUpDk/rs:fit:493:391:1/g:ce/aHR0cHM6Ly9yZWFj/dG5hdGl2ZWNvZGUu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE4LzAyL0RlZmF1/bHRfSW1hZ2VfVGh1/bWJuYWlsLnBuZw",
            }}
            resizeMode="contain"
            style={
              !single || !expanded
                ? {
                    width: mediaWidth,
                    height: mediaHeight,
                    overflow: "hidden",
                    borderRadius: 8,
                  }
                : {
                    width: "100%",
                    height: 250,
                    overflow: "hidden",
                    borderRadius: 8,
                  }
            }
          />
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={expanded}
      style={[
        {
          margin: 2,
        },
        single || expanded
          ? { width: "100%", justifyContent: "center", alignItems: "center" }
          : null,
      ]}
    >
      <Image
        ref={mediaRef}
        source={{ uri: MEDIA_URL + media.src }}
        resizeMode="contain"
        style={
          !single
            ? {
                width: mediaWidth,
                height: mediaHeight,
                overflow: "hidden",
                borderRadius: 8,
              }
            : {
                width: "100%",
                height: 250,
                overflow: "hidden",
                alignSelf: "center",
                borderRadius: 8,
              }
        }
      />
    </TouchableOpacity>
  );
};

export default Media;
