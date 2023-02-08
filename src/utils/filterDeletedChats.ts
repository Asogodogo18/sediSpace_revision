const _ = require("lodash");

function compareCondition(
  user: string | number,
  user1: string | number,
  user2: string | number,
  delete1: string,
  delete2: string
) {
  // console.log("user: ", user);
  // console.log("user 1 : ", user1);
  // console.log("user 2 : ", user2);
  // console.log("delete 1 : ", delete1);
  // console.log("delete 2 : ", delete2);
  // console.log("--------------------------\n");

  if (user == user1 && delete1 == "Y") return false;
  else if (user == user2 && delete2 == "Y") return false;
  else return true;
}

const filterDeletedChats = _.memoize(
  (userId: string | number, chatArray: []) => {
    if (chatArray == undefined || chatArray.length == 0) return [];
    const filteredArray = chatArray.filter((chat) =>
      compareCondition(
        userId,
        chat?.user_one,
        chat?.user_two,
        chat?.delete_fs1,
        chat?.delete_fs2
      )
    );
    // console.log("removed deleted chats: ", filteredArray);

    return filteredArray;
  }
);

export const filterDeletedMessages = _.memoize(
  (payload: {
    userId: string | number;
    chatArray: [];
    user1: string | number;
    user2: string | number;
  }) => {
    const { chatArray, user1, user2, userId } = payload;
    if (chatArray == undefined || chatArray.length == 0) return [];
    const filteredArray = chatArray.filter((chat) =>
      compareCondition(
        userId,
        user1,
        user2,
        chat["deleted_fs1"],
        chat["deleted_fs2"]
      )
    );
    // console.log("removed deleted messages: ", filteredArray);

    return filteredArray;
  }
);

export default filterDeletedChats;
