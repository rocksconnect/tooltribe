/**
 * @file(user.router.js) All routing of User
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 12-March-2018
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

router.post('/register', (req, res) => {
    userService.addUser(req, res);
});

router.post('/updateProfile', (req, res) => {
    userService.editUser(req, res);
});

router.post('/deleteUser', (req, res) => {
    userService.deleteUser(req, res);
}); 

router.post('/login', (req, res) => {
    userService.login(req, res);
});

router.post('/userLogin', (req, res) => {
    userService.userLogin(req, res);
});

router.post('/forgetPassword',(req,res)=>{
    userService.forgetPassword(req,res);
});

router.post('/forgetPasswordReset',(req,res)=>{
    userService.forgetPasswordReset(req,res);
});

router.post('/changePassword',(req,res)=>{
    userService.changePassword(req,res);
});

router.post('/updateUser',(req,res)=>{
     userService.update(req,res);

})
router.post('/assignRoleToUser',(req,res)=>{
     userService.assignRoleToUser(req,res);
})



export default router;
