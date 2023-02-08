import { toNumber } from "lodash";

export function isFollowing(userID: string, followersArray: number[]) {
  if (followersArray === undefined || followersArray.length == 0) return false;
  if (followersArray.includes(toNumber(userID))) return true;
  else return false;
}

export function hasLiked(likeArray: [], userId: string) {
  if (likeArray == undefined || likeArray.length == 0) return false;
  return likeArray.includes(userId);
}
