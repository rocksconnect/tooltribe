/**
 * @file(config.dev.js) With all variables that is need on whole project
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 11-Jan-2018
 * @lastModifedBy Shakshi
 */
import path from "path";

let config = {};

config.logFileDir = path.join(__dirname, '../../log');
config.logFileName = 'app.log';
config.dbHost = process.env.dbHost || 'localhost';
config.dbPort = process.env.dbPort || '27017';
config.dbName = process.env.dbName || 'iot_server_app';
config.serverPort = process.env.serverPort || 83;
config.superAdminLoginDetails = {email:"superAdmin@synergytop.com",password:"synergytop"}

export default config;