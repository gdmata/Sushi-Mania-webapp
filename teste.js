const axios = require("axios");
const dataMenu = require("./menu");
const { type } = require("node:os");
console.log(typeof dataMenu);

/* async function getData() {
  try {
    const response = await axios.get("./menu.json");
    if (!response.ok) {
      throw new Error("Error", response.status);
    }

    console.log(response.data);
  } catch (e) {
    console.error("error", e);
  }
}

getData();
 */
