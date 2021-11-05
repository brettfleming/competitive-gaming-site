const { User } =require('../models');

const { singToken } =require('../utils/auth');

module.exports = {
    async getSingleUser({ user = null, params }, res) {
        const foundUser = await User.findOne({
          $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        });
    
        if (!foundUser) {
          return res.status(400).json({ message: 'Cannot find user' });
        }
    
        res.json(foundUser);
      },
      // create user, sign token, and send back (client/src/components/SignUpForm.js)
  async createUser({ body }, res) {
    // console.log(body);
    const user = await User.create(body);
    // console.log(user)
    if (!user) {
      return res.status(400).json({ message: 'User not created' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },
}