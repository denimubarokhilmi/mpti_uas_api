import fs from "node:fs/promises";
import {
  path_file_inventory,
  path_file_user,
  path_file_borrowing,
} from "./initialization_dbs_example.js";
class User {
  constructor() {}

  async #read_user_data() {
    try {
      const result = await fs.readFile(path_file_user, "utf8");
      return JSON.parse(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async #read_inventory_list() {
    try {
      const result = await fs.readFile(path_file_inventory, "utf8");
      return JSON.parse(result);
    } catch (error) {
      throw error;
    }
  }

  async get_find_user() {
    try {
      const read = await this.#read_user_data();
      return read.user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async find_user(username) {
    try {
      const read = await this.#read_user_data();
      const found = read.user.find(
        (item) => item.username == username || item.nim == username,
      );
      return found;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async find_room(inventory, items_id) {
    try {
      return inventory.room.find((item) => item.id_room == items_id);
    } catch (error) {
      throw error;
    }
  }

  async find_facility(inventory, items_id) {
    try {
      return inventory.facility.find((item) => item.id_facility == items_id);
    } catch (error) {
      throw error;
    }
  }
  async get_borrowed_items() {
    try {
      const file = await fs.readFile(path_file_borrowing, "utf8");
      return JSON.parse(file);
    } catch (error) {
      throw error;
    }
  }

  #generateNextId(list, idKey, prefix) {
    if (list.length === 0) {
      return `${prefix}001`;
    }

    const lastId = list[list.length - 1][idKey];
    const number = parseInt(lastId.replace(prefix, ""), 10) + 1;

    return `${prefix}${String(number).padStart(3, "0")}`;
  }

  async borrowing_items(req, payload) {
    try {
      const user_id = req.user.id;
      const items_id = payload.items_id;

      const inventory = await this.#read_inventory_list();
      const result_file = await fs.readFile(path_file_borrowing, "utf8");
      const borrowed_inventory = JSON.parse(result_file);

      const found_room = await this.find_room(inventory, items_id);
      const found_facility = await this.find_facility(inventory, items_id);
      const newId = this.#generateNextId(
        borrowed_inventory.borrowed_list,
        "borrowed_id",
        "BD",
      );

      if (found_room) {
        found_room.status.pending = true;
        found_room.status.available = false;
        found_room.status.approved = false;

        const data_payload = {
          borrowed_id: newId,
          user_id,
          ...payload,
          item: {
            ...found_room,
          },
        };

        borrowed_inventory.borrowed_list.push(data_payload);
        await fs.writeFile(
          path_file_borrowing,
          JSON.stringify(borrowed_inventory, null, 2),
        );
        await fs.writeFile(
          path_file_inventory,
          JSON.stringify(inventory, null, 2),
        );
        return {
          message: `borrower with id ${items_id} successful`,
        };
      }

      if (found_facility) {
        if (found_facility.quantity_available - payload.quantity < 0) {
          throw new Error("capacity is not available");
        }

        found_facility.status.pending = true;
        found_facility.status.approved = false;

        const data_payload = {
          borrowed_id: newId,
          user_id,
          ...payload,
          item: { ...found_facility },
        };
        borrowed_inventory.borrowed_list.push(data_payload);

        await fs.writeFile(
          path_file_borrowing,
          JSON.stringify(borrowed_inventory, null, 2),
        );

        return {
          message: `borrower with id ${items_id} successful`,
        };
      }
      throw new Error("failed to borrow inventory");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async find_index_room_borrowed(list, items_id) {
    try {
      return list.borrowed_list.findIndex(
        (items) => items.borrowed_id == items_id,
      );
    } catch (error) {
      throw error;
    }
  }
  async find_index_facilities_borrowed(list, items_id) {
    try {
      return list.borrowed_list.findIndex(
        (items) => items.item.id_facility == items_id,
      );
    } catch (error) {
      throw error;
    }
  }

  async cancel_item_loan(req, payload) {
    try {
      const user_id = req.user.id;
      const items_id = payload.items_id;
      const borrowed_id = payload.borrowed_id;
      const type = payload.item.type;
      const borrowed_inventory = JSON.parse(
        await fs.readFile(path_file_borrowing, "utf8"),
      );
      const inventory = await this.#read_inventory_list();
      const found_room = await this.find_room(inventory, items_id);

      const found_index = await this.find_index_room_borrowed(
        borrowed_inventory,
        borrowed_id,
      );

      if (found_index >= 0 && type == "room") {
        borrowed_inventory.borrowed_list.splice(found_index, 1);
        found_room.status.available = true;

        await fs.writeFile(
          path_file_borrowing,
          JSON.stringify(borrowed_inventory, null, 2),
        );
        await fs.writeFile(
          path_file_inventory,
          JSON.stringify(inventory, null, 2),
        );
        return {
          message: `Cancel loan with ID ${items_id} successful`,
        };
      }

      if (found_index >= 0) {
        borrowed_inventory.borrowed_list.splice(found_index, 1);

        await fs.writeFile(
          path_file_borrowing,
          JSON.stringify(borrowed_inventory, null, 2),
        );
        return {
          message: `Cancel loan with ID ${items_id} successful`,
        };
      }
      throw new Error("room or facility not found");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export { User };
