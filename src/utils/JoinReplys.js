var _ = require("lodash");

const JoinReplys = (replyArray) => {
if (replyArray.length<=1) return _.head(replyArray)
  return _.join(replyArray,' et ')
}

export default JoinReplys