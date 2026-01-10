import fs from "node:fs/promises";
import {
  path_file_admin,
  path_file_user,
  path_file_officer,
  path_file_inventory,
} from "./initialization_dbs_example.js";

import bcrypt from "bcrypt";

class Admin {
  async #read(path) {
    const data = await fs.readFile(path, "utf8");
    return JSON.parse(data);
  }

  #generateNextId(list, idKey, prefix) {
    if (list.length === 0) {
      return `${prefix}001`;
    }

    const lastId = list[list.length - 1][idKey];
    const number = parseInt(lastId.replace(prefix, ""), 10) + 1;

    return `${prefix}${String(number).padStart(3, "0")}`;
  }

  async #write(path, data) {
    await fs.writeFile(path, JSON.stringify(data, null, 2));
  }
  async hashed_password(password) {
    return await bcrypt.hash(password, 10);
  }

  async updateAdminPassword(req, payload) {
    const currentUser = req.user.username;
    const { password } = payload;
    const data = await this.#read(path_file_admin);

    const admin = data.admin.find((a) => a.username === currentUser);
    if (!admin) throw new Error("Admin tidak ditemukan");

    admin.password = await this.hashed_password(password);

    await this.#write(path_file_admin, data);
    return {
      message: "password is success changed",
    };
  }

  async getUsers() {
    return await this.#read(path_file_user);
  }

  async addUser(payload) {
    const data = await this.#read(path_file_user);
    payload.password = await this.hashed_password(payload.password);
    const newId = this.#generateNextId(data.user, "id_user", "USR");

    data.user.push({
      id_user: newId,
      role: "user",
      status: "aktif",
      ...payload,
    });

    await this.#write(path_file_user, data);
    return {
      message: `users id ${newId} is success generated`,
    };
  }

  async updateUser(payload) {
    const id_user = payload.id_user;
    const data = await this.#read(path_file_user);
    payload.password = await this.hashed_password(payload.password);
    const user = data.user.find((u) => u.id_user === id_user);
    if (!user) throw new Error("User tidak ditemukan");

    Object.assign(user, payload);
    await this.#write(path_file_user, data);
    return {
      message: `User id ${id_user} is updated successfully`,
    };
  }

  async deleteUser(payload) {
    const data = await this.#read(path_file_user);
    data.user = data.user.filter((u) => u.id_user !== payload.id_user);
    await this.#write(path_file_user, data);
  }

  async getOfficers() {
    return await this.#read(path_file_officer);
  }
  async addOfficer(payload) {
    const data = await this.#read(path_file_officer);
    payload.password = await this.hashed_password(payload.password);
    const newId = this.#generateNextId(data.officer, "id_officer", "PTG");

    data.officer.push({
      id_officer: newId,
      role: "officer",
      status: "aktif",
      ...payload,
    });

    await this.#write(path_file_officer, data);
    return {
      message: `officer id ${newId} is success generated`,
    };
  }

  async updateOfficer(payload) {
    const id_officer = payload.id_officer;
    const data = await this.#read(path_file_officer);
    payload.password = await this.hashed_password(payload.password);
    const officer = data.officer.find((o) => o.id_officer === id_officer);
    if (!officer) throw new Error("Officer tidak ditemukan");

    Object.assign(officer, payload);
    await this.#write(path_file_officer, data);
    return {
      message: `officers id ${id_officer} is updated successfully`,
    };
  }

  async deleteOfficer(payload) {
    const data = await this.#read(path_file_officer);
    data.officer = data.officer.filter(
      (o) => o.id_officer !== payload.id_officer
    );
    await this.#write(path_file_officer, data);
    return {
      message: `officers id ${payload.id_officer} is deleted successfully`,
    };
  }

  async getInventory() {
    return await this.#read(path_file_inventory);
  }

  // ROOM
  async addRoom(payload) {
    const data = await this.#read(path_file_inventory);

    const newId = this.#generateNextId(data.room, "id_room", "RG");

    data.room.push({
      id_room: newId,
      status: { available: true },
      ...payload,
    });

    return {
      message: `room id ${newId} is success generated`,
    };
  }

  async updateRoom(payload) {
    const data = await this.#read(path_file_inventory);
    const id_room = payload.id_room;
    const room = data.room.find((r) => r.id_room === id_room);
    if (!room) throw new Error("Room tidak ditemukan");

    Object.assign(room, payload);
    await this.#write(path_file_inventory, data);
    return {
      message: `room id ${payload.id_room} is updated succesfully`,
    };
  }

  async deleteRoom(payload) {
    const data = await this.#read(path_file_inventory);
    data.room = data.room.filter((r) => r.id_room !== payload.id_room);
    await this.#write(path_file_inventory, data);
    return {
      message: `room id ${payload.id_room} is deleted successfully`,
    };
  }

  // FACILITY
  async addFacility(payload) {
    const data = await this.#read(path_file_inventory);

    const newId = this.#generateNextId(data.facility, "id_facility", "FS");

    data.facility.push({
      id_facility: newId,
      status: { available: true },
      ...payload,
    });

    await this.#write(path_file_inventory, data);
    return {
      message: `facility id ${newId} is success generated`,
    };
  }

  async updateFacility(payload) {
    const data = await this.#read(path_file_inventory);
    const id_facility = payload.id_facility;
    const facility = data.facility.find((f) => f.id_facility === id_facility);
    if (!facility) throw new Error("Facility tidak ditemukan");

    Object.assign(facility, payload);
    await this.#write(path_file_inventory, data);
    return {
      message: `facility id ${id_facility} is updated successfully`,
    };
  }

  async deleteFacility(payload) {
    const data = await this.#read(path_file_inventory);
    data.facility = data.facility.filter(
      (f) => f.id_facility !== payload.id_facility
    );
    await this.#write(path_file_inventory, data);
    return {
      message: `facility id ${id_facility} is deleted successfully`,
    };
  }
}

export { Admin };
