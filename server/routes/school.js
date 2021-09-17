const express = require("express");
const router = express.Router();
const uploadMultiImage = require("../utils/uploadFiles");
const multer = require("multer");

const {
    createSchool,
    getSchoolById,
    getAllSchools,
    updateSchool,
} = require("../controllers/school");

router.route("/:id").post(function (req, res, next) {
    uploadMultiImage(req, res, function (err) {
        if (err instanceof multer.MulterError){
            res.send(err);
        } else if (err){
            res.send(err);
        }
        createSchool(req, res, next);
    });
});
router.route("/schools").get(getAllSchools);
router.route("/:id").get(getSchoolById);
router.route("/:id/:creator").patch(function (req, res, next){
    uploadMultiImage(req, res, function (err) {
        if (err instanceof multer.MulterError){
            res.send(err);
        } else if (err){
            res.send(err);
        }
        updateSchool(req, res, next);
    });
});

module.exports = router;