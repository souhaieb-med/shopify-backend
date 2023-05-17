import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

// export const verifyTokenAndAuthorization = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       next();
//     } else {
//       return next(createError(403, "You are not alowed to do that!"));
//     }
//   });
// };

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user.isAdmin)
      return next(createError(403, "You are not alowed to do that!"));
    next();
  });
};
