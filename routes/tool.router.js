import express from "express";
import toolService from "../service/tool.service";
import viewdToolService from "../service/viewdTool.service";

const router = express.Router()


router.post('/getHomeScreenData',(req,res)=>{
    toolService.getHomeScreenData(req,res);
});

router.post('/homeScreenSearch',(req,res)=>{
    toolService.homeScreenSearch(req,res);
});

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

router.get('/getRecentTool',(req,res)=>{
	toolService.getRecentTool(req,res);
});

router.post('/getViewedTool',(req,res)=>{
    viewdToolService.getRecentViewTool(req,res);
});

router.post('/addViewedTool',(req,res)=>{
    viewdToolService.addViewedTool(req,res);
});

router.post('/updateViewedTool',(req,res)=>{
    viewdToolService.updateViewedTool(req,res);
});

router.post('/hideTool',(req,res)=>{
	toolService.hideTool(req,res);
});

router.post('/getCategoryToolList',(req,res)=>{
    toolService.getCategoryToolList(req,res);
});

router.post('/getDetailsOfTool',(req,res)=>{
	toolService.getDetailsOfTool(req,res)
});

router.post('/addShareTool',(req,res)=>{
	toolService.addShareTool(req,res)
});

export default router;