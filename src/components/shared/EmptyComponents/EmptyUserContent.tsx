import React from "react";
import Layout from "./Layout";
import EmptyContentBg from "../../../../assets/images/EmptyContentBG.svg";

type Props = { message?: string };

const EmptyUserContent = ({ message }: Props) => {
  return (
    <Layout
      bgComponent={<EmptyContentBg width={250} />}
      message={message || "Cet utilisateur n'a aucun poste"}
    ></Layout>
  );
};

export default EmptyUserContent;
