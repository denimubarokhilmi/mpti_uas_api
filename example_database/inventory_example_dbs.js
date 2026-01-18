import fs from "node:fs/promises";
import {
  path_file_inventory,
  path_file_borrowing,
} from "./initialization_dbs_example.js";

class Inventory {
  async #readInventory() {
    const data = await fs.readFile(path_file_inventory, "utf8");
    return JSON.parse(data);
  }

  async #writeInventory(data) {
    await fs.writeFile(path_file_inventory, JSON.stringify(data, null, 2));
  }

  async #readBorrowed() {
    const data = await fs.readFile(path_file_borrowing, "utf8");
    return JSON.parse(data);
  }

  async #writeBorrowed(data) {
    await fs.writeFile(path_file_borrowing, JSON.stringify(data, null, 2));
  }

  #isBookingExpired(end_date, end_time) {
    const now = new Date();

    const endDateTime = new Date(`${end_date}T${end_time}:00`);

    return now >= endDateTime;
  }

  async updateFacilityStatusByQuantity() {
    const inventory = await this.#readInventory();

    for (const facility of inventory.facility) {
      if (facility.quantity_available <= 0) {
        facility.status.available = false;
      } else {
        facility.status.available = true;
      }
    }

    await this.#writeInventory(inventory);
  }

  async restoreExpiredBookings() {
    const inventory = await this.#readInventory();
    const borrowed = await this.#readBorrowed();

    const activeBorrowedList = [];

    for (const booking of borrowed.borrowed_list) {
      if (booking.item.status.rejected) {
        activeBorrowedList.push(booking);
        continue;
      }
      const isExpired =
        booking.end_date &&
        booking.end_time &&
        this.#isBookingExpired(booking.end_date, booking.end_time);

      if (isExpired) {
        if (booking.item?.id_room) {
          const room = inventory.room.find(
            (r) => r.id_room === booking.item.id_room,
          );

          if (room) {
            room.status.available = true;
          }
        }

        if (booking.item?.id_facility) {
          const facility = inventory.facility.find(
            (f) => f.id_facility === booking.item.id_facility,
          );

          if (facility) {
            facility.quantity_available += booking.quantity ?? 1;
          }
        }

        continue;
      }

      activeBorrowedList.push(booking);
    }

    borrowed.borrowed_list = activeBorrowedList;

    await this.#writeInventory(inventory);
    await this.#writeBorrowed(borrowed);
    await this.updateFacilityStatusByQuantity();
    return;
  }

  async find_inventory() {
    await this.restoreExpiredBookings();
    return await this.#readInventory();
  }
}

export { Inventory };
