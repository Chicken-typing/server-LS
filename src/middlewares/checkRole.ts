import { Request, NextFunction } from "express";
import decodeToken from "../utils/decodeToken";
const isAdmin = (request: Request, next: NextFunction) => {
  const { role } = decodeToken(request.body._token);
  if (role == "admin") {
    next();
  }
};
const isMasterAdmin = (request: Request, next: NextFunction) => {
  const { role } = decodeToken(request.body._token);
  if (role == "master_admin") {
    next();
  }
};
const isAgent = (request: Request, next: NextFunction) => {
  const { role } = decodeToken(request.body._token);
  if (role == "agent") {
    next();
  }
};
export { isAdmin, isMasterAdmin, isAgent };
