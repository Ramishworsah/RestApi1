const express = require('express');
const router = express.Router();
const cdr = require('../controllers/courseController');

// Define the POST route with the callback function
router.post('/createcourse', cdr.createUse);
router.get('/getAllCourse',cdr.showall);
router.get('/getAllCourse/:cid',cdr.getCourse);
router.get('/getcoursebybranch/:cbranch',cdr.getCourseByBranch);
router.delete('/delete/:cid', cdr.deletebycoid);

module.exports = router;
