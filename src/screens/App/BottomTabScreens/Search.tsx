import React, { useState } from "react";
import {
  Box,
  Text,
  Post,
  Searchbar,
  SearchFilters,
  MainHeader,
  ErrorDisplayView,
  ContactSuggestion,
  EmptySearchComponent,
} from "../../../components";

import { ScrollView } from "react-native";

import SearchFilter from "../../../data/searchFiltre";
import { PostImage, PostMultipleImages } from "../../../data/post";
import Animated from "react-native-reanimated";
import useUserSearchController from "../../../viewController/Search/useSearchController";
import { FlatList } from "react-native-gesture-handler";

const AnimatedBox = Animated.createAnimatedComponent(Box);

const Search = ({ navigation }) => {
  const {
    isLoading,
    searchTerm,
    error,
    handleChange,
    isSuccess,
    isError,
    userSearchResults,
  } = useUserSearchController();

  console.log("searchresults: ", userSearchResults);
  console.log("error: ", error);

  console.log("isSuccess: ", isSuccess);

  const [search, setSearch] = useState("");

  const onSearchChange = (param: string) => {
    setSearch(param);
  };

  const handleNavigation = () => {
    return navigation.navigate("HomeStack", { screen: "Publication" });
  };
  return (
    <Box flex={1} mt={"l"}>
      <MainHeader title="Recherche" />
      <Searchbar
        value={searchTerm}
        onChange={handleChange}
        placeholder="Recherche"
        loader={isLoading}
      />
      {/* <SearchFilters data={SearchFilter} onPress={() => {}} /> */}
          {[
          isSuccess,
          userSearchResults?.status !== 200,
          searchTerm !== "",
        ].every(Boolean) || isError ? (
          <ErrorDisplayView
            message={isError ? error?.error : userSearchResults?.message}
          />
        ) : [
            isSuccess,
            userSearchResults?.status == 200,
            userSearchResults?.data.length === 0,
          ].every(Boolean) ? (
          <ErrorDisplayView message="Aucun Résultat Pour cette Recherche" />
        ) : (
          <FlatList
            style={{ height:'100%'}}
            contentContainerStyle={{ flexGrow: 1, alignItems: "flex-start" }}
            data={searchTerm === "" ? [] : userSearchResults?.data}
            ListEmptyComponent={EmptySearchComponent}
            renderItem={({ item }) => (
              <ContactSuggestion
                data={item}
                onPress={() =>
                  navigation.navigate("Profile", {
                    userID: item.id,
                    self: false,
                  })
                }
              />
            )}
            keyExtractor={(i) => i.id}
          />
        )}
    </Box>
  );
};

export default Search;
