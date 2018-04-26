import express from "express";
import ratingService from "../service/rating.service";

const router = express.Router();

router.post('/addRating',(req,res)=>{
    ratingService.addRating(req,res);
});

router.post('/getRating',(req,res)=>{
	ratingService.getRating(req,res);
});


export default router;