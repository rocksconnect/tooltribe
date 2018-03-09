/**
 * @file(index.router.js) All routing is imported here
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 11-Jan-2018
 * @lastModifedBy Shakshi
 */
import express from "express";
const router = express.Router()


import user from './user.router.js';
import usertype from './usertype.router.js';

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

export default router;
//export default {device, asset, region, zone, branch, user, usertype, assettype, router};
