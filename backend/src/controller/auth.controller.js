const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const jwt = require("jsonwebtoken");
const { userModel } = require("../Models/user.model");
const { workerModel } = require("../Models/worker.model");
const { pgModel } = require("../Models/pg.model");

const bcrypt = require("bcrypt");

// Helper: strip sensitive fields from user object before sending response
const sanitizeUser = (userDoc) => {
  const obj = userDoc.toObject ? userDoc.toObject() : { ...userDoc };
  delete obj.password;
  delete obj.__v;
  return obj;
};

const toggleWishlist = async (req, res) => {
  try {
    const { itemId } = req.body;
    if (!itemId) return res.status(400).json({ message: "Missing itemId" });

    const account = req.user;
    const index = account.wishlist.indexOf(itemId);
    
    if (index > -1) {
      account.wishlist.splice(index, 1);
    } else {
      account.wishlist.push(itemId);
    }

    await account.save();
    return res.status(200).json({
      message: "Wishlist updated",
      wishlist: account.wishlist
    });
  } catch (error) {
    console.error("WISHLIST ERROR:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const registerController = async (req, res) => {
  try {
    let { name, email, mobile, dob, gender, password } = req.body;

    let existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    let hashedPass = await bcrypt.hash(password, 10);

    let newUser = await userModel.create({
      name,
      email,
      mobile,
      dob,
      gender,
      password: hashedPass,
    });

    const token = jwt.sign({ id: newUser._id, role: "user" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token);

    return res.status(201).json({
      message: "User registered",
      token,
      user: sanitizeUser(newUser),
    });
  } catch (error) {
    console.error("REGISTRATION ERROR:", error);
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};

const loginController = async (req, res) => {
  try {
    let { email, password, role } = req.body;

    let user = null;
    let worker = null;

    if (role === 'worker' || role === 'recruiter') {
      worker = await workerModel.findOne({ email });
    } else if (role === 'user') {
      user = await userModel.findOne({ email });
    } else {
      user = await userModel.findOne({ email });
      worker = user ? null : await workerModel.findOne({ email });
    }

    if (!user && !worker) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    const account = user || worker;
    const actualRole = user ? "user" : "worker";

    let comparePass = await bcrypt.compare(password, account.password);

    if (!comparePass) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      { id: account._id, role: actualRole },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token);

    return res.status(200).json({
      message: `${actualRole} logged in`,
      token,
      user: sanitizeUser(account),
      role: actualRole,
    });

  } catch (error) {
    console.log("🔥 LOGIN ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};



const googleLoginController = async (req, res) => {
  try {
    const { token } = req.body; // frontend sends Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    let user = await userModel.findOne({ email: payload.email });
    let worker = await workerModel.findOne({ email: payload.email });

    let account = user || worker;
    let role = user ? "user" : worker ? "worker" : null;

    if (!account) {
      // default create as regular user
      account = await userModel.create({
        name: payload.name,
        email: payload.email,
        password: await bcrypt.hash(
          jwt.sign({ sub: payload.sub }, process.env.JWT_SECRET).slice(0, 12),
          10
        ),
      });
      role = "user";
    }

    const mytoken = jwt.sign({ id: account._id, role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", mytoken);

    return res.status(200).json({
      message: "Google login successful",
      token: mytoken,
      user: sanitizeUser(account),
      role,
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid Google token" });
  }
};


const workRegisterController = async (req, res) => {
    try {
    let { name, address, dob, gender, email, mobile, password, profession } = req.body;

    let existingUser = await workerModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Worker already exists with this email",
      });
    }

    let hashedPass = await bcrypt.hash(password, 10);

    let newUser = await workerModel.create({
      name, address, dob, gender,
      email,
      mobile,
      password: hashedPass,
      profession
    });

    const token = jwt.sign({ id: newUser._id, role: "worker" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token);

    return res.status(201).json({
      message: "Worker registered",
      token,
      user: sanitizeUser(newUser),
      role: "worker",
    });
  } catch (error) {
    console.error("WORKER REGISTRATION ERROR:", error);
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
}


const pgRegisterController = async (req, res) => {
  try {
    let { pgAddress, pgOwnerName, pgOwnerMobile, pgOwnerEmail,
      pgCity, pgState, pgPincode, pgCountry, pgRooms, pgPrice,
      pgDescription, pgImages, pgFacilities, pgRules, availability, reviews } = req.body;

    if(reviews > 5 || reviews < 0){
      return res.status(400).json({
        message: "Reviews cannot be greater than 5 or less than 0",
      });
    }

    let existingpg = await pgModel.findOne({ pgOwnerEmail });

    if (existingpg) {
      return res.status(409).json({
        message: "PG already exists",
      });
    }

    let newpg = await pgModel.create({
      pgAddress, pgOwnerName, pgOwnerMobile, pgOwnerEmail, pgCity, pgState, pgPincode, pgCountry, pgRooms, pgPrice, pgDescription, pgImages, pgFacilities, pgRules, availability,
      reviews
    });
    
    const token = jwt.sign({ id: newpg._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token);

    return res.status(201).json({
      message: "PG registered",
      token,
      pg: newpg,
    });
  } catch (error) {
    console.error("PG REGISTRATION ERROR:", error);
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
}


module.exports = {
  registerController,
  loginController,
  googleLoginController,
  workRegisterController,
  pgRegisterController,
  toggleWishlist
};