const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const User = require("../../models/user.model");
const createError = require("../../helpers/errorCreator");
const { main: sendMail } = require("../../helpers/nodemailer");
const { format } = require("date-fns");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username });

    if (!user) {
      return next(createError(new Error(""), 400, "User doesn't exist"));
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    const matchResetPassword =
      user.resetPassword &&
      (await bcrypt.compare(password, user.resetPassword));

    if (
      (!matchPassword && user.resetPassword && !matchResetPassword) ||
      (!matchPassword && !user.resetPassword)
    ) {
      return next(createError(new Error(""), 400, "Wrong password"));
    }

    if (matchPassword && user.resetPassword) {
      user.resetPassword = "";
      await user.save();
    }

    if (matchResetPassword) {
      user.password = user.resetPassword;
      user.resetPassword = "";
      await user.save();
    }

    var token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return res.status(200).json({
      data: {
        username: user.username,
        role: user.role,
      },
      metadata: {
        accessToken: token,
      },
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.changePassword = async (req, res, next) => {
  try {
    const { username, password, new_password } = req.body;
    const user = req.user;

    if (req.user.username !== username) {
      return next(createError(new Error(""), 403, "Forbidden"));
    }

    try {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return next(createError(new Error(""), 400, "Wrong password"));
      }
    } catch (error) {
      return next(createError(new Error(""), 400, "Wrong password"));
    }

    bcrypt.hash(new_password, 10, async function (err, hash) {
      if (err) {
        throw err;
      }

      user.password = hash;
      await user.save();

      return res.status(200).json({
        message: "Thành công",
      });
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;

    const user = await User.findOne({ username });
    if (user) {
      return next(createError(new Error(""), 400, "User already exist"));
    }

    bcrypt.hash(password, 10, async (error, hash) => {
      if (error) {
        throw error;
      }

      await User.create({ username, password: hash, role });
      return res.status(200).json({
        message: "Thành công",
      });
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });

    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    next(createError(error, 500));
  }
};

module.exports.changeRole = async (req, res, next) => {
  try {
    const { username, role } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return next(createError(new Error(""), 400, "User doesn't exist"));
    }

    user.role = role;
    await user.save();

    return res.status(200).json({
      message: "Thành công",
      data: {
        _id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return next(createError(new Error(""), 400, "Not found"));
    }

    await User.findOneAndDelete({ username });

    return res.status(200).json({
      message: "Thành công",
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ username: email });

    if (!user) {
      return next(createError(new Error(""), 400, "Not found"));
    }

    let newPassword = require("../../helpers/generateRandomPassword")(12);

    bcrypt.hash(newPassword, 10, async (error, hash) => {
      if (error) {
        throw error;
      }

      user.resetPassword = hash;
      await user.save();

      let html = `<div style="background: black; color: white; padding: 8px">
        <h1>Thông báo: reset mật khẩu</h1>
        <h2>Yêu cầu reset mật khẩu lúc: ${format(
          new Date(),
          "hh:mm - dd/MM/yyyy"
        )}</h2>
        <br>
        <h3>Mật khẩu mới: ${newPassword}</h3>
        </div>`;

      const config = {
        to: email,
        subject: "Thông báo: reset mật khẩu",
        text: "Thông báo: reset mật khẩu",
        html: html,
      };

      await sendMail(config);

      return res.status(200).json({
        message: `Mật khẩu mới đã được gửi đến địa chỉ email ${email}.`,
      });
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};
