import { Request, Response } from "express";

const CheckAuth = (req: Request, res: Response) => {
  if (req.session && req.session.admin) {
    res.redirect("/home");
  } else {
    res.redirect("/login");
  }
};

const RedirectIfAuthenticated = (req: Request, res: Response) => {
  if (req.session && req.session.admin) {
    return res.redirect("/home");
  }
  res.redirect("/login");
};

export default { CheckAuth, RedirectIfAuthenticated };
