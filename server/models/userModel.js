const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required."],
      
    },
    email: {
      type: String,
      required: [true, "Provide a valid email"],
      unique:[true,"Email should be unique"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: true,
      validate: {
        //this only works on create and save!!!
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not same",
      },
      select: false,
    },

    passwordChangedAt: {
      type: Date,
      select: false,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    pic:{
      type:String,
    },
    passwordResetExpires: { type: Date, select: false },
  },
  { timestamps: true }
);

// middleware for bcrypting password

userSchema.pre("save", async function (next) {
  //only run this function if the password is modified
  if (!this.isModified("password")) {
    return next();
  }
  //hash the paasword with bcrypt
  this.password = await bcrypt.hash(this.password, 12);
  // console.log(this.password);
  //deleting confirm password
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// for checking passoword

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// this method is checking if the user change its password or not after the creation of jwt
userSchema.methods.checkPasswordIsChanged = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return changedTimeStamp > JWTTimestamp;
  }
  // false means password is not changed
  return false;
};

// for creating password reset token

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // Setting expiration to 5 minutes from now
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
