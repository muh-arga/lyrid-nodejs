const bcrypt = require("bcrypt");
const { User } = require("../models");
const { Op } = require("sequelize");

exports.index = async (req, res) => {
  const search = req.query.search || "";
  const users = await User.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { username: { [Op.like]: `%${search}%` } },
      ],
    },
  });

  res.render("users/index", {
    users: users,
    search: search,
    title: "Users",
    currentPage: "users",
  });
};

exports.detail = async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    req.flash("error", "User not found");
    return res.redirect("/users");
  }

  res.render("users/detail", {
    user: user,
    title: "User Detail",
    currentPage: "users",
  });
};

exports.create = async (req, res) => {
  res.render("users/create", {
    title: "Create User",
    currentPage: "users",
  });
};

exports.store = async (req, res) => {
  let { name, username, password, role } = req.body;

  if (!name || !username || !password || !role) {
    req.flash("error", "All fields are required");
    return res.redirect("/users");
  }

  try {
    const userExists = await User.findOne({ where: { username } });

    if (userExists) {
      req.flash("error", "Username already exists");
      return res.redirect("/users/create");
    }

    password = await bcrypt.hash(password, 10);
    const user = await User.create({ name, username, password, role });
    req.flash("success", "User created successfully");
    res.redirect("/users");
  } catch (error) {
    req.flash("error", "Error creating user");
    res.redirect("/users/create");
  }
};

exports.edit = async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    req.flash("error", "User not found");
    return res.redirect("/users");
  }

  res.render("users/edit", {
    user: user,
    title: "Edit User",
    currentPage: "users",
  });
};

exports.update = async (req, res) => {
  let { name, username, role } = req.body;

  const user = await User.findByPk(req.params.id);

  if (!user) {
    req.flash("error", "User not found");
    return res.redirect("/users");
  }

  let password = user.password;

  try {
    if (req.body.password) {
      password = await bcrypt.hash(req.body.password, 10);
    }

    const userExists = await User.findOne({
      where: { username, id: { [Op.ne]: req.params.id } },
    });

    if (userExists) {
      req.flash("error", "Username already exists");
      return res.redirect(`/users/edit/${req.params.id}`);
    }

    await user.update({ name, username, password, role });
    req.flash("success", "User updated successfully");
    res.redirect("/users");
  } catch (error) {
    req.flash("error", "Error updating user: " + error.message);
    return res.redirect(`/users/edit/${req.params.id}`);
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/users");
    }

    await user.destroy();
    req.flash("success", "User deleted successfully");
    res.redirect("/users");
  } catch (error) {
    req.flash("error", "Error deleting user");
    res.redirect("/users");
  }
};
