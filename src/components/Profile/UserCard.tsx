import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { toastError } from "../../utils/toastHandler";
import useUserController from "../../viewController/Users/UserController";
import Avatar from "../shared/Avatar";
import Box from "../shared/Box";
import Text from "../shared/Text";
import UserSkeleton from "../skeleton/UserSkeleton";

type Props = { userID: number | string };

const UserCard = ({ userID }: Props) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const { getUserFromId, userRefetchTrigger } = useUserController();

  useEffect(() => {
    if (!userData) {
      setIsLoading(true);
      loadUserData(userID.toString()).then(() => {
        setIsLoading(false);
      });
    }

    return () => {
      setUserData(null);
    };
  }, [userRefetchTrigger]);

  const loadUserData = async (id: string) => {
    setIsLoading(true);
    try {
      const payload = await getUserFromId(id);
      console.log("user card response", payload);

      if (payload.code === 200) {
        setUserData(payload.data);
        setIsLoading(false);
      } else if (payload.code !== 200) {
        setIsLoading(false);
        throw new Error(payload?.message);
      }
    } catch (error) {
      console.log("error user data: ", error);
      toastError(error.toString());
      setIsLoading(false);
    }
  };

  const handleNavigation = () => {
    navigation.navigate("Profile", {
      userID: userID,
      self: false,
    });
  };

  if (isLoading) {
    return <UserSkeleton />;
  }
  return (
    <TouchableOpacity
      style={{ width: "100%", height: 70 }}
      activeOpacity={0.7}
      onPress={handleNavigation}
    >
      <Box width={"100%"} height={70} flexDirection={"row"}>
        {/* avatar  */}
        <Box flex={1} justifyContent={"center"}>
          <Avatar
            type="profile"
            source={{
              uri: `${userData?.avatar}`,
            }}
          />
        </Box>
        {/* user details */}
        <Box
          flex={3}
          paddingVertical="m"
          justifyContent={"center"}
          alignItems={"flex-start"}
        >
          <Text
            fontSize={15}
            fontWeight={"600"}
            textTransform={"capitalize"}
            variant={"title"}
          >
            {userData?.first_name} {userData?.last_name}
          </Text>
          <Text pl={"m"} pt={"xs"} variant={"caption"}>
            @ {userData?.user_name}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default UserCard;
