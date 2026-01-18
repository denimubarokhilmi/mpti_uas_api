import fs from "node:fs/promises";
import {
  path_file_officer,
  path_file_inventory,
  path_file_borrowing,
} from "./initialization_dbs_example.js";
class Officer {
  constructor() {}

  async #read_officer_data() {
    try {
      const result = await fs.readFile(path_file_officer, "utf8");
      return JSON.parse(result);
    } catch (error) {
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

  async get_find_officer() {
    try {
      const read = await this.#read_officer_data();
      return read.officer;
    } catch (error) {
      throw error;
    }
  }

  async find_officer(username) {
    try {
      const read = await this.#read_officer_data();
      const found = read.officer.find(
        (item) => item.username == username || item.nim == username,
      );
      return found;
    } catch (error) {
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
        (items) => items.borrowed_id == items_id,
      );
    } catch (error) {
      throw error;
    }
  }

  async receive_borrowed_items(req, payload) {
    try {
      const user_id = req.user.id;
      const items_id = payload.items_id;
      const borrowed_id = payload.borrowed_id;
      const type = payload.type;

      const inventory = await this.#read_inventory_list();
      const borrowed_inventory = JSON.parse(
        await fs.readFile(path_file_borrowing, "utf8"),
      );

      const found_room = await this.find_room(inventory, items_id);
      const found_facility = await this.find_facility(inventory, items_id);
      const found_index = await this.find_index_room_borrowed(
        borrowed_inventory,
        borrowed_id,
      );

      if (found_room && type == "room") {
        found_room.status.available = false;
        await fs.writeFile(
          path_file_inventory,
          JSON.stringify(inventory, null, 2),
        );

        borrowed_inventory.borrowed_list[found_index].item.status.approved =
          true;

        borrowed_inventory.borrowed_list[found_index].item.status.pending =
          false;
        Object.assign(borrowed_inventory.borrowed_list[found_index], payload);
        await fs.writeFile(
          path_file_borrowing,
          JSON.stringify(borrowed_inventory, null, 2),
        );
        return {
          message: `borrower with id ${items_id} successful`,
        };
      }

      if (found_facility) {
        found_facility.quantity_available -=
          borrowed_inventory.borrowed_list[found_index].quantity;

        await fs.writeFile(
          path_file_inventory,
          JSON.stringify(inventory, null, 2),
        );

        borrowed_inventory.borrowed_list[found_index].item.status.approved =
          true;

        borrowed_inventory.borrowed_list[found_index].item.status.pending =
          false;
        Object.assign(borrowed_inventory.borrowed_list[found_index], payload);
        console.log(borrowed_inventory.borrowed_list);

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

  async rejected_item_loan(req, payload) {
    try {
      const user_id = req.user.id;
      const items_id = payload.items_id;
      const borrowed_id = payload.borrowed_id;
      const type = payload.type;
      const inventory = await this.#read_inventory_list();
      const found_room = await this.find_room(inventory, items_id);
      const borrowed_inventory = JSON.parse(
        await fs.readFile(path_file_borrowing, "utf8"),
      );
      const found_index = await this.find_index_room_borrowed(
        borrowed_inventory,
        borrowed_id,
      );

      if (found_index >= 0 && type == "room") {
        found_room.status.available = true;
        await fs.writeFile(
          path_file_inventory,
          JSON.stringify(inventory, null, 2),
        );
        borrowed_inventory.borrowed_list[found_index].item.status.rejected =
          true;

        delete borrowed_inventory.borrowed_list[found_index].item.status
          .approved;

        borrowed_inventory.borrowed_list[found_index].item.status.pending =
          false;

        Object.assign(borrowed_inventory.borrowed_list[found_index], payload);

        await fs.writeFile(
          path_file_borrowing,
          JSON.stringify(borrowed_inventory, null, 2),
        );
        return {
          message: `Rejected loan with ID ${items_id} successful`,
        };
      }

      if (found_index >= 0) {
        borrowed_inventory.borrowed_list[found_index].item.status.rejected =
          true;

        delete borrowed_inventory.borrowed_list[found_index].item.status
          .approved;

        borrowed_inventory.borrowed_list[found_index].item.status.pending =
          false;
        Object.assign(borrowed_inventory.borrowed_list[found_index], payload);

        await fs.writeFile(
          path_file_borrowing,
          JSON.stringify(borrowed_inventory, null, 2),
        );
        return {
          message: `Rejected loan with ID ${items_id} successful`,
        };
      }
      throw new Error("room or facility not found");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export { Officer };
