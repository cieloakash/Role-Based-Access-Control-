import express from "express";
import tokenVerify from "../middleware/auth.middleware.js";

const userRoutes = express.Router();

userRoutes.get('/dahboard', tokenVerify(),(req, res) => {
    res.status(200).json({ message: "Welcome to the dashboard route" });
});


userRoutes.get('/admin', tokenVerify(['admin']),(req, res) => {
    res.status(200).json({ message: "Welcome to the admin route" });
});

userRoutes.get('/logistic',tokenVerify(['logistic']),(req, res) => {
    res.status(200).json({ message: "Welcome to the logistic route" });
});

userRoutes.get('/sales',tokenVerify(['sales']), (req, res) => {
    res.status(200).json({ message: "Welcome to the sales route" });
});

export default userRoutes;
