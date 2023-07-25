const mongoose = require("mongoose");
const secret_key = "saurabhtiwari";
const CryptoJS = require("crypto-js");
const registerSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    // 1 -user, 2 - admin
    role: {
      type: Number,
    },
    isLoggedIn: {
      type: Boolean
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
registerSchema.pre("save", function (next) {
  if (this.password) {
    this.password = CryptoJS.AES.encrypt(this.password, secret_key).toString();
    next();
  } else {
    next();
  }
});
const register = mongoose.model("register", registerSchema);
module.exports = register;
