import { Router } from "express";
import { getTrendingGifs, searchGifs } from "../controllers/giphy.controller";

const router = Router();

router.get("/popular", getTrendingGifs);
router.get("/search", searchGifs);

export default router;
