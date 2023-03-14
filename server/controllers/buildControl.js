const { Build } = require("../models/userBuilds");
const { Item } = require("../models/item");

module.exports = {
  addBuild: async (req, res) => {
    const { champion, userId, buildName } = req.body;
    const newBuild = await Build.create({
      champion,
      userId,
      buildName,
    });
    res.status(200).send(newBuild);
  },
  addItems: async (req, res) => {
    const { buildArr, id } = req.body;
    buildArr.forEach(async (item, index) => {
      await Item.create({
        item_object: item,
        buildId: id,
        orderNumber: index,
      });
    });
  },
  getUserBuilds: async (req, res) => {
    try {
      const { userId } = req.params;
      const userBuilds = await Build.findAll({
        where: { id: userId },
      });
      res.status(200).send(userBuilds);
    } catch (error) {
      console.log("ERROR IN GET BUILDS");
      res.sendStatus(400);
      console.log(error);
    }
  },
  deleteBuild: async (req, res) => {
    try {
      const { buildId } = req.params;
      await Build.destroy({ where: { id: +buildId } });
      await Item.destroy({ where: { buildId: null } });
      res.sendStatus(200);
    } catch (error) {
      console.log("ERROR IN DELETE");
      console.log(error);
    }
  },
};
