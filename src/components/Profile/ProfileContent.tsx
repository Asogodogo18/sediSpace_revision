import React from "react";
import { FlatList } from "react-native";
import Box from "../shared/Box";
import Button from "../shared/Button";
import EmptyUserContent from "../shared/EmptyComponents/EmptyUserContent";
import Post from "../shared/Post/Post";

type ProfileContentProps = {
  data: any[];
  loadMore?: () => void;
  hasNextPage?: boolean;
  isLoading?: boolean;
};

const ProfileContent: React.FC<ProfileContentProps> = ({
  data,
  hasNextPage,
  isLoading,
  loadMore,
}) => {
  return (
    <FlatList
      contentContainerStyle={{ flex: 1 }}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, i) => `userposts-${i}`}
      ListEmptyComponent={<EmptyUserContent />}
      data={data}
      renderItem={({ item: post }) => <Post type="main" data={post} />}
      ListFooterComponent={
        hasNextPage ? (
          <Button
            primary
            loading={isLoading}
            title="Voir Plus"
            onPress={loadMore}
            alignSelf={'center'}
            my={'ml'}
          />
        ) : null
      }
    />
  );
};

export default ProfileContent;
