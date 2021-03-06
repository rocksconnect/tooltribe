import express from "express";
import idProofService from "../service/idProofType.service";

const router = express.Router()

router.get('/allIdProof', (req, res) => {
    idProofService.getIdProofType(req, res);
});
router.post('/addIdProofType',(req,res)=>{
     idProofService.addIdProofType(req,res);
})
router.post('/updateIdProofType',(req,res)=>{
     idProofService.updateIdProofType(req,res);
})
router.post('/removeIdProofType',(req,res)=>{
     idProofService.removeIdProofType(req,res);
})
router.get('/getAllList', (req, res) => {
    idProofService.getAllList(req, res);
});

router.post('/getBrandCategory',(req, res)=>{
	idProofService.getBrandCategory(req, res);
});

export default router;