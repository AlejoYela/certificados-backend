const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  person: { type: mongoose.Schema.Types.ObjectId, ref: "Person", required: true }
});

const Auth = mongoose.model("Auth", authSchema, "auth");

module.exports = Auth;
