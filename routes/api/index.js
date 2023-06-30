import express from 'express'
import userRoutes  from "./user-routes.js";
import thoughtRoutes from "./thought-routes.js";

const router = express.Router()
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

router.get("*", function (req, res) {
    res.json({
      message: "There is no such API route",
    });
  });


export default router
