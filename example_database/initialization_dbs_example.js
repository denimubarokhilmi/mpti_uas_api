import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "./user_dbs_example.js";
import { Admin } from "./admin_dbs_example.js";
import { Inventory } from "./inventory_example_dbs.js";
import { Officer } from "./officer_dbs_example.js";
import path from "node:path";

const parent_path = process.cwd();
const path_file_borrowing = path.join(
  parent_path,
  "data",
  "borrowing_list.json"
);
const path_file_inventory = path.join(
  parent_path,
  "data",
  "inventory_list.json"
);
const path_file_user = path.join(parent_path, "data", "user_list.json");
const path_file_officer = path.join(parent_path, "data", "officer_list.json");
const path_file_admin = path.join(parent_path, "data", "admin_list.json");

class Database_Example {
  constructor() {
    this.user = new User();
    this.officer = new Officer();
    this.admin = new Admin();
    this.inventory = new Inventory();
  }

  async hashed_password(password) {
    return await bcrypt.hash(password, 10);
  }

  async compare_password(password, hashed_password) {
    return await bcrypt.compare(password, hashed_password);
  }

  async generateToken(payload) {
    try {
      const token = jwt.sign(
        {
          email: payload.email,
          username: payload.username,
          id: payload.id_user
            ? payload.id_user
            : payload.id_officer
            ? payload.id_officer
            : payload.id_admin
            ? payload.id_admin
            : "",
        },
        "project_mpti_uas",
        { expiresIn: "2h" }
      );
      console.log("Succes generated token");
      return token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async login(username, password) {
    try {
      const result = await Promise.all([
        this.user.find_user(username),
        this.officer.find_officer(username),
        this.admin.find_admin(username),
      ]);
      const [user_data, officer_data, admin_data] = result;
      let is_true = false;

      if (user_data) {
        is_true = await this.compare_password(password, user_data.password);
        if (is_true) {
          const token = await this.generateToken(user_data);
          return {
            message: "login successfully",
            token,
            role: "user",
            name: user_data.name,
          };
        }
      }
      if (officer_data) {
        is_true = await this.compare_password(password, officer_data.password);
        if (is_true) {
          const token = await this.generateToken(officer_data);
          return {
            message: "login successfully",
            token,
            role: "officer",
            name: officer_data.name,
          };
        }
      }
      if (admin_data) {
        is_true = await this.compare_password(password, admin_data.password);
        if (is_true) {
          const token = await this.generateToken(admin_data);
          return {
            message: "login successfully",
            token,
            role: "admin",
            name: admin_data.name,
          };
        }
      }
      throw new Error("Invalid user or password");
    } catch (error) {
      throw error;
    }
  }

  async find_inventorys() {
    try {
      const inventory = await this.inventory.find_inventory();
      return inventory;
    } catch (error) {
      throw error;
    }
  }

  async find_user_and_officer() {
    try {
      const user = await this.user.get_find_user();
      const officer = await this.officer.get_find_officer();
      return { user, officer };
    } catch (error) {
      throw error;
    }
  }
}

const dbs_example = new Database_Example();
export {
  dbs_example,
  path_file_user,
  path_file_officer,
  path_file_admin,
  path_file_inventory,
  path_file_borrowing,
};
