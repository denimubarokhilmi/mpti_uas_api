import fs from "node:fs/promises";
import { dbs_example } from "../example_database/initialization_dbs_example.js";

const loginServices = async (request) => {
  try {
    const { username, password } = request;
    const result = await dbs_example.login(username, password);
    return result;
  } catch (error) {
    throw error.message;
  }
};

export default { loginServices };
