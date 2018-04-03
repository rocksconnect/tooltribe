import express from "express";
import brandService from "../service/brand.service";

const router = express.Router()


router.get('/getBrandList',(req,res)=>{
	brandService.getBrandList(req,res);
});

router.post('/addBrand',(req,res)=>{
    brandService.addBrand(req,res);
});

router.post('/editBrand',(req,res)=>{
	brandService.editBrand(req,res);
});

router.post('/deletedBrand',(req,res)=>{
	brandService.deletedBrand(req,res);
});

export default router;