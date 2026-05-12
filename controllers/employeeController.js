const { Employee } = require("../models");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");

exports.index = async (req, res) => {
  const search = req.query.search || "";

  const employees = await Employee.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ],
    },
  });

  res.render("employees/index", {
    employees: employees,
    title: "Employees",
    search: search,
    currentPage: "employees",
  });
};

exports.detail = async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);

  if (!employee) {
    req.flash("error", "Employee not found");
    return res.redirect("/employees");
  }

  res.render("employees/detail", {
    employee: employee,
    title: "Employee Detail",
    currentPage: "employees",
  });
};

exports.create = async (req, res) => {
  res.render("employees/create", {
    title: "Create Employee",
    currentPage: "employees",
  });
};

exports.store = async (req, res) => {
  let { name, email, phone, address } = req.body;

  if (!name || !email || !phone || !address) {
    req.flash("error", "All fields are required");

    return res.redirect("/employees/create");
  }

  let photo;

  if (!req.file) {
    req.flash("error", "Photo is required");
    return res.redirect("/employees/create");
  }

  try {
    await Employee.create({
      name,
      email,
      phone,
      address,
      photo: req.file.filename,
    });

    req.flash("success", "Employee created successfully");

    res.redirect("/employees");
  } catch (error) {
    console.log(error);

    req.flash("error", "Error creating employee");

    res.redirect("/employees/create");
  }
};

exports.edit = async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);

  if (!employee) {
    req.flash("error", "Employee not found");
    return res.redirect("/employees");
  }

  res.render("employees/edit", {
    employee: employee,
    title: "Edit Employee",
    currentPage: "employees",
  });
};

exports.update = async (req, res) => {
  let { name, email, phone, address } = req.body;

  if (!name || !email || !phone || !address) {
    req.flash("error", "All fields are required");
    return res.redirect(`/employees/edit/${req.params.id}`);
  }

  try {
    const employee = await Employee.findByPk(req.params.id);

    let photo = employee.photo;

    if (req.file) {
      photo = req.file.filename;

      // Delete old photo
      if (employee.photo) {
        const oldPhotoPath = path.join(
          __dirname,
          "..",
          "public",
          "uploads",
          employee.photo,
        );
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }
    }

    if (!employee) {
      req.flash("error", "Employee not found");
      return res.redirect("/employees");
    }

    await employee.update({ name, email, phone, address, photo });
    req.flash("success", "Employee updated successfully");
    res.redirect("/employees");
  } catch (error) {
    req.flash("error", "Error updating employee");
    res.redirect(`/employees/edit/${req.params.id}`);
  }
};

exports.delete = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);

    if (!employee) {
      req.flash("error", "Employee not found");
      return res.redirect("/employees");
    }

    if (employee.photo) {
      const photoPath = path.join(
        __dirname,
        "..",
        "public",
        "uploads",
        employee.photo,
      );
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }

    await employee.destroy();
    req.flash("success", "Employee deleted successfully");
    res.redirect("/employees");
  } catch (error) {
    req.flash("error", "Error deleting employee");
    res.redirect("/employees");
  }
};
