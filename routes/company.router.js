/**
 * @file(company.router.js)   
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 26-March-2018
 * @lastModifedBy Shakshi
 */

import express from "express";
import CompanyService from "../service/company.service";

const router = express.Router()

router.post('/addCompany', (req, res) => {
    CompanyService.addCompany(req, res);
});

router.post('/getCompany', (req, res) => {
    CompanyService.getCompany(req, res);
});

router.post('/removeCompany', (req, res) => {
    CompanyService.removeCompany(req, res);
});

router.post('/updateCompany', (req, res) => {
    CompanyService.updateCompany(req, res);
});

export default router;
