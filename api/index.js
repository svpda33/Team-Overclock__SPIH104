/**
 * Vercel Serverless Function Entry Point
 * Wraps Express application for Vercel deployment.
 */

const app = require('../server/index');

module.exports = app;
