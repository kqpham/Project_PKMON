const express = require("express");
const router = express.Router();
const uploadMultiImage = require("../util/upload");
const multer = require("multer");

const {
    createSchool,
    createSchoolNoImg,
    getSchoolById,
    getAllSchools,
    updateSchool,
    updateSchoolNoImg,
} = require("../controllers/school");
const { update } = require("../models/Schools");

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
router.route("/n/:id").post(createSchoolNoImg);
router.route("/:id").get(getSchoolById);
router.route("/n/:id/:creator").patch(updateSchoolNoImg);
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