import React from "react";

import Layout from "./Layout";
import EmptySearchBg from "../../../../assets/images/EmptySearchBG.svg";

const EmptySearch = () => {
  return (
    <Layout
      bgComponent={<EmptySearchBg />}
      message="Veuillez éffectuer une recherche afin de recevoir des suggestions"
    ></Layout>
  );
};

export default EmptySearch;
