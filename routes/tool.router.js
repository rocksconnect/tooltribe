import express from "express";
import toolService from "../service/tool.service";

const router = express.Router()

router.post('/addTool',(req,res)=>{
    toolService.addTool(req,res);
});

router.get('/getToolList',(req,res)=>{
    toolService.getToolList(req,res);
});

router.post('/addAccessoriesImage',(req,res)=>{
	toolService.addAccessoriesImage(req,res);
});

router.post('/addToolImage',(req,res)=>{
	toolService.addToolImage(req,res);
});

/*router.get('/getBrandList',(req,res)=>{
	brandService.getBrandList(req,res);
});

router.post('/deletedBrand',(req,res)=>{
	brandService.deletedBrand(req,res);
});*/

export default router;