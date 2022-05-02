const getCurrentUser = async (req, res) => {
  const { email, login, token, _id, role } = req.user;
  const userInfo = { email, login, token, _id, role };
  res.status(200).json(userInfo);
};

module.exports = getCurrentUser;
