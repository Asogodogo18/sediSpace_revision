import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import {
  Box,
  MainHeader,
  ContactSuggestion,
  Searchbar,
  SectionHeader,
  ErrorDisplayView,
  EmptySearchComponent,
} from "../../../components";
import { newMessage } from "../../../data/NewMessage";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import useUserSearchController from "../../../viewController/Search/useSearchController";

const NewMessage = () => {
  const navigation = useNavigation();
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainHeader title="Nouveau" />

      <Box mb={"ml"}>
        <Searchbar
          value={searchTerm}
          onChange={handleChange}
          placeholder="Recherche"
          loader={isLoading}
        />
      </Box>
      <SectionHeader title={"Suggestion"} more={false} />
      {[isSuccess, userSearchResults?.status !== 200, searchTerm !== ""].every(
        Boolean
      ) || isError ? (
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
          contentContainerStyle={{ flex: 1 }}
          data={searchTerm === "" ? [] : userSearchResults?.data}
          ListEmptyComponent={EmptySearchComponent}
          renderItem={({ item }) => (
            <ContactSuggestion
              data={item}
              onPress={() =>
                navigation.navigate("Chats", { receiverId: item.id })
              }
            />
          )}
          keyExtractor={(i) => i.id}
        />
      )}
    </SafeAreaView>
  );
};

export default NewMessage;
