const School = require("../models/Schools");
const asyncHandler = require("express-async-handler");

exports.createSchool = asyncHandler(async (req, res, next) => {
  const { schoolName, schoolAbout, schoolLocation, schoolAdmission} = req.body;
  console.log(req.body);
  School.create({
    schoolName,
    schoolAbout,
    schoolLocation,
    schoolAdmission,
    schoolImage: req.files[0].location,
    creatorId: req.params.id,
  }).then((response) =>{
    console.log("new School", response);
    if (response) {
      res.status(201).json({
        success: {
          school: response,
        },
      });
    } else {
      res.status(500);
      throw new Error(
        "Could not create new school at this time, please try again later"
      );
    }
  });  
});

exports.createSchoolNoImg = asyncHandler(async (req, res, next) =>{
  const { schoolName, schoolAbout, schoolLocation, schoolAdmission} = req.body;

  const temp = ""
  School.create({
    schoolName,
    schoolAbout,
    schoolLocation,
    schoolAdmission,
    schoolImage: temp,
    creatorId: req.params.id,
  }).then((response) =>{
    console.log("new School", response);
    if (response) {
      res.status(201).json({
        success: {
          school: response,
        },
      });
    } else {
      res.status(500);
      throw new Error(
        "Could not create new school at this time, please try again later"
      );
    }
  });  
});

exports.getSchoolById = asyncHandler(async (req, res, next) => {
  const schoolId = req.params.id;

  const school = await School.findById(schoolId);

  if (!school) {
    res.status(404);
    throw new Error("No school found for given id");
  } else {
    res.status(200).json({ school: school });
  }
});

exports.getAllSchools = asyncHandler(async (req, res, next) => {
  const schools = await School.find();
  res.status(200).json({ schools: schools });
});

exports.updateSchool = asyncHandler(async (req, res, next) => {
  const { schoolName, schoolAbout, schoolLocation, schoolAdmission } =
    req.body;

  const schoolId = req.params.id;
  const creatorId = req.params.creator;

  let school = await School.findById(schoolId);

  if (!school) {
    res.status(404);
    throw new Error("No School Found for given Id");
  } else {
    if (school.creatorId === creatorId) {
      let createdSchool = await School.findByIdAndUpdate(
        schoolId,
        {
          schoolName,
          schoolAbout,
          schoolLocation,
          schoolAdmission,
          schoolImage: req.files[0].location,
        },
        { new: true }
      );
      if (createdSchool) {
        res.status(201).json({
          success: {
            school: createdSchool,
          },
        });
      } else {
        res.status(500);
        throw new Error(
          "Could not update school at this time, please try again later"
        );
      }
    } else {
      res.status(401);
      throw new Error("You do not have permission to edit this school");
    }
  }
});
exports.updateSchoolNoImg = asyncHandler(async (req, res, next) => {
  const { schoolName, schoolAbout, schoolLocation, schoolAdmission, schoolImage} = req.body;

  const schoolId = req.params.id;
  const creatorId = req.params.creator;

  let school = await School.findById(schoolId);

  if (!school) {
    res.status(404);
    throw new Error("No School Found for given Id");
  } else {
    if (school.creatorId === creatorId) {
      let createdSchool = await School.findByIdAndUpdate(
        schoolId,
        {
          schoolName,
          schoolAbout,
          schoolLocation,
          schoolAdmission,
          schoolImage,
        },
        { new: true }
      );
      if (createdSchool) {
        res.status(201).json({
          success: {
            school: createdSchool,
          },
        });
      } else {
        res.status(500);
        throw new Error(
          "Could not update school at this time, please try again later"
        );
      }
    } else {
      res.status(401);
      throw new Error("You do not have permission to edit this school");
    }
  }
});