const { User } = require("../models/user");
const { Build } = require("../models/userBuilds");
const { Item } = require("../models/item");
module.exports = {
  getUsername: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findAll({
        where: { id: userId },
      });
      const userBuilds = await Build.findAll({
        where: { userId: userId },
        include: [
          {
            model: Item,
            require: true,
          },
        ],
      });

      res.status(200).send({ user: user, userBuilds: userBuilds });
    } catch (error) {
      console.log("ERROR IN GET USERNAME");
      res.sendStatus(400);
      console.log(error);
    }
  },
};
