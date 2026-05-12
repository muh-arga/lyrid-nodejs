const bcrypt = require("bcrypt");

const { User } = require("../models");

exports.loginPage = (req, res) => {
  res.render("auth/login", {
    layout: "layouts/auth",
    title: "Login",
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!user) {
    req.flash("error", "Invalid username or password");
    return res.redirect("/login");
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    req.flash("error", "Invalid username or password");
    return res.redirect("/login");
  }

  req.session.user = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  req.flash("success", "Login successful");
  res.redirect("/");
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
