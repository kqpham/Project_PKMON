const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
    schoolId: { type: String },
    schoolName: { type: String, required: true },
    schoolAbout: { type: String, required: true },
    schoolLocation: { type: String, required: true },
    schoolAdmission: { type: String, required: true },
    schoolImage: { type: String },
    creatorId: {type: String },
});

module.exports = School = mongoose.model("school", schoolSchema);