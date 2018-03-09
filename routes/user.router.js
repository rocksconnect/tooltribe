/**
 * @file(asset.router.js) All routing of asset
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 5-Feb-2018
 * @lastModifedBy Shakshi
 */

import express from "express";
import userService from "../service/user.service";

const router = express.Router()

router.get('/allUser', (req, res) => {
    userService.getAll(req, res);
});

router.get('/oneUser', (req, res) => {
    userService.getOne(req, res);
});

router.post('/addUser', (req, res) => {
    userService.addUser(req, res);
});

router.post('/editUser', (req, res) => {
    userService.editUser(req, res);
});

router.post('/deleteUser', (req, res) => {
    userService.deleteUser(req, res);
}); 

router.post('/login', (req, res) => {
    userService.login(req, res);
});

router.post('/forgetPassword',(req,res)=>{
    userService.forgetPassword(req,res);
})
router.post('/forgetPasswordReset',(req,res)=>{
    userService.forgetPasswordReset(req,res);
})
router.post('/changePassword',(req,res)=>{
    userService.changePassword(req,res);
})
 router.post('/updateUser',(req,res)=>{
     userService.update(req,res);
 })

export default router;
