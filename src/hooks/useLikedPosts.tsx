import React, { useEffect, useState } from "react";
import { useGetAllPostsMutation } from "../Api/PostApi";
import filterPosts from "../utils/filterPosts";

type Props = {};

const useLikedPosts = (props: Props) => {
  const [offset, setOffset] = useState(1);
  const [currentUser, setCurrentUser] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const [likedPostdata, setLikedPostdata] = useState([]);
  const [getAllPostsMutation, { isLoading }] = useGetAllPostsMutation();
  const [error, setError] = useState("");
  console.log("likedPosts : ", likedPostdata);

  useEffect(() => {
    return () => {
      setLikedPostdata([]);
      setAllPosts([]);
      setHasNextPage(true);
    };
  }, [currentUser]);

  useEffect(() => {
    getLikedPosts(currentUser);
    return () => {};
  }, [offset]);

  const loadMore = () => {
    setOffset(offset + 1);
  };

  const getAllPosts = async () => {
    const payload = new FormData();
    payload.append("offset", offset.toString());

    try {
      const response = await getAllPostsMutation(payload).unwrap();
      console.log("response all posts: ", response);

      if (response.status !== 200) throw new Error(response?.message);
      else {
        if (response.data.length == 0) {
          setHasNextPage(false);
          return;
        }
        offset === 1
          ? setAllPosts(Array.from(response?.data))
          : setAllPosts([...allPosts, ...response?.data]);
      }
    } catch (error) {
      console.log("likedPosts: ", error);
      setError(error);
    }
  };
  const getLikedPosts = async (userID: string) => {
    setCurrentUser(userID);
    await getAllPosts();
    const filteredPosts = filterPosts.filterLikedPosts(allPosts, userID);
    if (filteredPosts.length === 0 && hasNextPage) {
      console.log("offset valeur: ", offset);

      setOffset(offset + 1);
      console.log("offset valeurs: ", offset);

      return;
    }
    offset === 1
      ? setLikedPostdata(filteredPosts)
      : setLikedPostdata([...likedPostdata, ...filteredPosts]);
  };

  return {
    getLikedPosts,
    loadMore,
    likedPostdata,
    isLoading,
    hasNextPage,
    error,
  };
};
export default useLikedPosts;
