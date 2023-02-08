import React from "react";

import Layout from "./Layout";
import EmptyChatBg from "../../../../assets/images/EmptyChatBG.svg";

const EmptyChat = () => {
  return (
    <Layout
      bgComponent={<EmptyChatBg />}
      message="Vous n'avez aucune conversation en cours"
    ></Layout>
  );
};

export default EmptyChat;
