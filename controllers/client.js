import User from "../models/User.js";

export const getSearch = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const users = await User.find({
      $or: [
        { occupation: { $regex: new RegExp(search, "i") } },
        { workPlace: { $regex: new RegExp(search, "i") } },
      ]
    })
      .select('firstName occupation workPlace email phoneNumber') // specific fields
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await User.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      users,  // Updated variable name here
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
