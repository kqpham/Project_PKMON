const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
    schoolId: { type: String, },
    schoolName: { type: String, },
    schoolAbout: { type: String, },
    schoolLocation: { type: String, },
    schoolAdmission: { type: String, },
    schoolImage: { type: String, },
    creatorId: {type: String, },
});

module.exports = School = mongoose.model("school", schoolSchema);