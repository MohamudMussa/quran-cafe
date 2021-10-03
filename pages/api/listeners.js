const { instance } = require("../../lib/db/models/plausible");

export default async function handler(req, res) {
  const result = await instance.getListeners();
  res.status(200).json(result);
}
