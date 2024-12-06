import { User } from "../models/index.js";

export default (router) => {
  const signup = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.create({
        email: username,
        password_hash: password,
      });
      res.json({ userId: user.id });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ where: { email: username } });
      if (!user || user.password_hash !== password) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
      res.json({ userId: user.id });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  router.post("/signup", signup);
  router.post("/signin", signin);
};
