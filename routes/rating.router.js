import express from "express";
import ratingService from "../service/rating.service";

const router = express.Router();

router.post('/addRating',(req,res)=>{
    ratingService.addRating(req,res);
});


export default router;