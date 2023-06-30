
import express from 'express'
import apiRoutes from "./api/index.js";

const router = express.Router()
router.use("/api", apiRoutes);

router.get("*", function (req, res) {
    res.json({
      message: "There is no such API route",
    });
  });


export default router