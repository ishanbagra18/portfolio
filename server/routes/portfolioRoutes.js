
import express from "express";
import { createPortfolio, getPortfolio } from "../controllers/portfolioController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import Portfolio from "../models/Portfolio.js";

const router = express.Router();

// Create a portfolio (Authenticated users only)
router.post("/createPortfolio", isAuthenticated, createPortfolio);

router.get("/portfolio/:email", async (req, res) => {
    const email = req.params.email; // Extract email from URL params

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    const portfolio = await Portfolio.findOne({ "personalInfo.email": email });
    if (!portfolio) {
        return res.status(404).json({ error: "Portfolio not found" });
    }
    res.status(200).json({ success: true, portfolio });

});

export default router;
