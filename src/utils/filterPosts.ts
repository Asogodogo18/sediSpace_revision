function getPostsWithMedia(postsArray: []) {
  return postsArray.filter((post) => post?.image !== undefined);
}

function getPostsWithText(postsArray: []) {
  return postsArray.filter((post) => post?.image === undefined);
}

function filterLikedPosts(postsArray: [], userID: string) {
  console.log("like Post userID: ", userID);

  return postsArray.filter((post) => {
    console.log("------------filter-------\n");
    console.log("post likes: ", post?.likes_count);

    if (post?.likes_count.includes(userID)) return post;
  });
}

export default { getPostsWithMedia, getPostsWithText, filterLikedPosts };
