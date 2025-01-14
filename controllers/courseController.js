const user = require('../models/courseSchema');
// const express = require('express');

const createUse = async (req, res) => {
    try {
        const { cid, cname, description,cbranch,cstdate,cPrice } = req.body;

        // Validate input fields
        if (!cid || !cname || !description || !cbranch || !cstdate || !cPrice) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if the course already exists
        const checkCourse = await user.find({ cid: cid });
        if (checkCourse!=0) {
            return res.status(401).json({
                success: false,
                message: "Course already exists",
            });
        }

        // Create a new course
        const newCourse = await user.create({
            cid: cid,
            cname: cname,
            description:description,
            cbranch:cbranch,
            cstdate:cstdate,
            cPrice:cPrice
            
        });

        return res.status(200).json({
            success: true,
            message: "Course successfully created",
            data: newCourse,
        });
    } catch (err) {
        // Handle any errors
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const showall = async(req, res) => {
    try {
        const alldata = await user.find();
      return  res.status(200).json({
            success: true,
            data: alldata,
        });
    }
    catch(error) {
      return res.status(403).json({
            success: false,
            message: error.message
        }) 
    }
}
const getCourse = async (req, res) => {
    try {
        const { cid: prid } = req.params.cid; // Extract `id` from route parameters
        const singleCourse = await user.findOne({ cid: prid }); // Use findOne for a single document
        
        if (singleCourse) { // Check if a course was found
            res.status(200).json({
                success: true,
                data: singleCourse,
            });
        } else {
            res.status(404).json({
                success: false,
                message: `Course with ID ${prid} does not exist in the collection.`,
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching the course.",
            error: err.message, 
        });
    }
};
const getCourseByBranch = async (req, res) => {
    try {
        const { cbranch: branch } = req.params;

        // Query for all courses that match the branch
        const courses = await user.find({ cbranch: branch });

        if (courses.length > 0) { // Check if any courses are found
            res.status(200).json({
                success: true,
                data: courses, // Return an array of matching courses
            });
        } else {
            res.status(404).json({
                success: false,
                message: `No courses found for branch ${branch}}.`,
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching the courses.",
            error: err.message, // Include the error message for debugging
        });
    }
};
const deletebycoid = async (req, res) => {
    try {
        // Extract the `cid` parameter from the request
        const id = req.params.cid;

        console.log("Deleting course with ID:", id); // Log the ID being deleted

        // Attempt to delete the document
        const result = await user.deleteOne({ cid: id });

        if (result.deletedCount > 0) {
            res.status(200).json({
                success: true,
                message: "Successfully deleted",
            });
        } else {
            res.status(404).json({
                success: false,
                message: `No course found with ID ${id}.`,
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the course.",
            error: err.message, // Include error message for debugging
        });
    }
};





module.exports = { createUse,showall,getCourse,getCourseByBranch,deletebycoid};
