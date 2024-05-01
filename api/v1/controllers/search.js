// controllers/search.js

const { Op } = require('sequelize');
const User = require('v1/models/user');

const searchController = async (req, res) => {
  const searchTerm = req.query.item;

  try {
    // Database Query
    const results = await User.findAll({
      where: {
        [Op.or]: [
          {
            username: {
              [Op.like]: `${searchTerm}%`
            }
          },
          {
            user_id: searchTerm
          }
        ]
      },
      attributes: ['user_id', 'username', 'avatar']
    });

    // JSON response
    res.json(results);
  } catch (error) {
    console.error('Error executing search query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = searchController;
