const { pgModel } = require("../Models/pg.model");

const getPGs = async (req, res) => {
  try {
    const { city } = req.query;
    let filter = {};

    if (city) {
      filter.pgCity = { $regex: city, $options: "i" };
    }

    const pgs = await pgModel.find(filter);

    return res.status(200).json({
      message: "PGs fetched successfully",
      count: pgs.length,
      pgs,
    });
  } catch (error) {
    console.error("GET PGS ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getPGById = async (req, res) => {
  try {
    const pg = await pgModel.findById(req.params.id);

    if (!pg) {
      return res.status(404).json({
        message: "PG not found",
      });
    }

    return res.status(200).json({
      message: "PG fetched successfully",
      pg,
    });
  } catch (error) {
    console.error("GET PG ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { getPGs, getPGById };
