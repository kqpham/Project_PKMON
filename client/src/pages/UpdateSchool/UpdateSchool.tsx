import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Paper,
  CssBaseline,
  Box,
  TextField,
  TextareaAutosize,
  Button,
} from "@material-ui/core";
import {
  updateSchool,
  updateSchoolNoImg,
  getSchoolById,
} from "../../helpers/APICalls/school";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { iSchool } from "../../interface/School";
import NavBar from "../../components/NavBar/NavBar";

interface RouteParams {
  id: string;
}

export default function UpdateSchool(): JSX.Element {
  const [inputFile, setInputFile] = useState<File>();
  const [sessionToken, setSessionToken] = useState<string>();
  const [schoolInfo, setSchoolInfo] = useState<iSchool>();
  const [hideButton, setHideButton] = useState<string>();
  const [formInput, setFormInput] = useState({
    schoolName: "",
    schoolAbout: "",
    schoolLocation: "",
    schoolAdmission: "",
    schoolImage: "",
  });
  const route = useHistory();
  const params = useParams<RouteParams>();

  const handleSubmit = () => {
    let data = new FormData();
    const { schoolName, schoolAbout, schoolLocation, schoolAdmission } =
      formInput;
    data.append("schoolName", schoolName);
    data.append("schoolAbout", schoolAbout);
    data.append("schoolLocation", schoolLocation);
    data.append("schoolAdmission", schoolAdmission);

    if (inputFile) {
      if (sessionToken) {
        data.append("multiImage", inputFile, inputFile.name);
        updateSchool(data, params.id, sessionToken).then((response) => {
          console.log(response);
          if (response.success) {
            route.push("/");
          } else if (response.error) {
            console.log(response.error.message);
          } else {
            console.log("An error has occured");
          }
        });
      }
    } else {
      if (sessionToken) {
        updateSchoolNoImg(formInput, params.id, sessionToken).then(
          (response) => {
            if (response.success) {
              route.push("/");
            } else if (response.error) {
              console.log(response.data.error);
            } else {
              console.log("An error has occured");
            }
          }
        );
      }
    }
  };

  const handleChange = (value: string, key: string) => {
    setFormInput((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleImageChange = ({
    currentTarget: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files && files.length) {
      setInputFile(files[0]);
      setHideButton("block");
    }
  };

  const removeFile = () => {
    const reseter = undefined;
    setInputFile(reseter);
    setHideButton("none");
  };

  useEffect(() => {
    async function fetchSchoolById() {
      const response = await getSchoolById(params.id);
      if (response) {
        const school = response.school;
        if (school) {
          setSchoolInfo(school);
         
            const tempInput = {
              schoolName: school.schoolName,
              schoolAbout: school.schoolAbout,
              schoolLocation: school.schoolLocation,
              schoolAdmission: school.schoolAdmission,
              schoolImage: school.schoolImage
            }
            setFormInput(tempInput);
          } 
        }
    }
    if (params) {
      fetchSchoolById();
    }
  }, [params]);

  useEffect(() => {
    function getSession() {
      const localItem = localStorage.getItem("sessionId");
      if (!localItem) {
        return null;
      }
      const item = JSON.parse(localItem);
      setSessionToken(item.value);
    }
    getSession();
  }, []);

  return (
    <Grid container component="main">
      <CssBaseline />
      <NavBar />
      <Grid item xs={12} sm={12} md={12} elevation={6} component={Paper} square>
        <Box>
          <Box
            width="100%"
            boxShadow={1}
            maxWidth={450}
            p={3}
            alignSelf="center"
          >
            <Grid container>
              <Grid item xs>
                <Typography component="h1" variant="h5">
                  Edit School
                </Typography>
              </Grid>
              <Grid item xs>
                <img src={schoolInfo?.schoolImage} />
              </Grid>
            </Grid>
            <form>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <Button
                size="small"
                onClick={(event) => {
                  event.preventDefault();
                  removeFile();
                }}
                style={{ display: `${hideButton}` }}
              >
                {" "}
                Remove File
              </Button>

              <Typography>Name:</Typography>
              {schoolInfo?.schoolName ? (
                <TextField
                  id="schoolName"
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={schoolInfo.schoolName}
                  onChange={(event) =>
                    handleChange(event.target.value, "schoolName")
                  }
                />
              ) : (
                <TextField
                  id="schoolName"
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) =>
                    handleChange(event.target.value, "schoolName")
                  }
                />
              )}

              <Typography>About:</Typography>
              {schoolInfo?.schoolAbout ? (
                <TextareaAutosize
                  id="schoolAbout"
                  minRows={5}
                  style={{ width: "100%" }}
                  defaultValue={schoolInfo.schoolAbout}
                  onChange={(event) =>
                    handleChange(event.target.value, "schoolAbout")
                  }
                />
              ) : (
                <TextareaAutosize
                  id="schoolAbout"
                  minRows={5}
                  style={{ width: "100%" }}
                  required
                  onChange={(event) =>
                    handleChange(event.target.value, "schoolAbout")
                  }
                />
              )}
              <Typography>Location:</Typography>
              {schoolInfo?.schoolLocation ? (
                <TextareaAutosize
                  id="schoolLocation"
                  minRows={5}
                  style={{ width: "100%" }}
                  defaultValue={schoolInfo.schoolLocation}
                  onChange={(event) =>
                    handleChange(event.target.value, "schoolLocation")
                  }
                />
              ) : (
                <TextareaAutosize
                  id="schoolLocation"
                  minRows={5}
                  style={{ width: "100%" }}
                  onChange={(event) =>
                    handleChange(event.target.value, "schoolLocation")
                  }
                />
              )}

              <Typography>Admission:</Typography>
              {schoolInfo?.schoolAdmission ? (
                <TextareaAutosize
                  id="schoolAdmission"
                  minRows={5}
                  style={{ width: "100%" }}
                  defaultValue={schoolInfo.schoolAdmission}
                  onChange={(event) =>
                    handleChange(event.target.value, "schoolAdmission")
                  }
                />
              ) : (
                <TextareaAutosize
                  id="schoolAdmission"
                  minRows={5}
                  style={{ width: "100%" }}
                  onChange={(event) =>
                    handleChange(event.target.value, "schoolAdmission")
                  }
                />
              )}

              <Box textAlign="center">
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={(event) => {
                    event.preventDefault();
                    handleSubmit();
                  }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
          <Box p={1} alignSelf="center" />
        </Box>
      </Grid>
    </Grid>
  );
}
