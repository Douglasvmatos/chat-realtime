const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { cpf, password } = req.body;
    const user = await User.findOne({ cpf });
    if (!user)
      return res.json({ msg: "CPF e senha não conferem", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "CPF e senha não conferem", status: false });

    user.loggedIn = true;  
    await user.save();  

    let userObj = user.toObject();
    delete userObj.password;

    return res.json({ status: true, user: userObj });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, cpf, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Nome de usuário já usado", status: false });
    const cpfCheck = await User.findOne({ cpf });
    if (cpfCheck)
      return res.json({ msg: "CPF já utilizado", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      cpf,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "cpf",
      "username",
      "avatarImage",
      "_id",
      "loggedIn"
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = async (req, res, next) => {
  try {
    if (!req.params.id) 
      return res.json({ msg: "O ID do usuário é obrigatório" });

    const user = await User.findById(req.params.id);
    if (!user)
      return res.json({ msg: "Usuário não encontrado", status: false });

    user.loggedIn = false; 
    await user.save();  

    onlineUsers.delete(req.params.id);

    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};