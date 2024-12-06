export const extractAuthHeader = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const userId = authHeader.split(" ")[1];
    req.user_id = userId;
  }

  next();
};
