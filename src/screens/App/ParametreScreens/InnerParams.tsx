import { ScrollView } from "react-native";
import React from "react";
import Layout from "../../Layout";

import Infos from "../../../components/Params/Infos";
import Securite from "../../../components/Params/Securite";
import Verify from "../../../components/Params/Verify";
import Language from "../../../components/Params/Language";
import Country from "../../../components/Params/Country";

const InnerParams = ({ route }) => {
  const { id } = route.params;
  //console.log(id);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 25 }}
      keyboardShouldPersistTaps="handled"
    
    >
      {renderInnerSetting(id)}
    </ScrollView>
  );
};

export default InnerParams;

function renderInnerSetting(id: any) {
  switch (id) {
    case 1:
      return <Infos />;
      break;
    case 2:
      return <Securite />;
      break;

    case 4:
      return <Verify />;
      break;
    case 5:
      return <Language />;
      break;
    case 6:
      return <Country />;
    default:
      null;
      break;
  }
}
