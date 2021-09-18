import React, { useState } from "react";
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
import { createSchool, createSchoolNoImg } from "../../helpers/APICalls/school";
import { useHistory } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

export default function CreateSchool(): JSX.Element {
  const [inputFile, setInputFile] = useState<File>();
  const [formInput, setFormInput] = useState({
    schoolName: "",
    schoolAbout: "",
    schoolLocation: "",
    schoolAdmission: "",
  });
  const route = useHistory();

  const handleSubmit = () => {
    let data = new FormData();
    const { schoolName, schoolAbout, schoolLocation, schoolAdmission } = formInput;
    data.append('schoolName', schoolName);
    data.append('schoolAbout', schoolAbout);
    data.append('schoolLocation', schoolLocation);
    data.append('schoolAdmission', schoolAdmission);
    
    if (inputFile) {
      data.append('multiImage', inputFile, inputFile.name);
      createSchool(data).then((response)=>{
        console.log(response);
        if (response.success) {
          route.push("/");
        } else if (response.error) {
          console.log(response.error.message);
        } else {
          console.log("An error has occured");
        }
      })
      
    } else {
     
      createSchoolNoImg(formInput).then((response)=>{
        if (response.success) {
          route.push("/");
        } else if (response.error) {
          console.log(response.error.message);
        } else {
          console.log("An error has occured");
        }
      });
      
    }
  };

  const handleChange = (value: string, key: string) =>{
    setFormInput((prevState)=>({...prevState, [key]:value}))}

  const handleImageChange = ({
    currentTarget: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files && files.length) {
      setInputFile(files[0]);
    }
  };

  return (
    <Grid container component="main">
      <NavBar />
      <CssBaseline />
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
                  Add School
                </Typography>
              </Grid>
            </Grid>
            <form>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <Typography>Name:</Typography>
              <TextField
                id="schoolName"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                required
                onChange={(event)=> handleChange(event.target.value, "schoolName")}
              />
              <Typography>About:</Typography>
              <TextareaAutosize
                id="schoolAbout"
                minRows={5}
                style={{ width: "100%" }}
                required
                onChange={(event)=> handleChange(event.target.value, "schoolAbout")}
              />
              <Typography>Location:</Typography>
              <TextareaAutosize
                id="schoolLocation"
                minRows={5}
                style={{ width: "100%" }}
                required
                onChange={(event)=> handleChange(event.target.value, "schoolLocation")}
              />

              <Typography>Admission:</Typography>
              <TextareaAutosize
                id="schoolAdmission"
                minRows={5}
                style={{ width: "100%" }}
                required
                onChange={(event)=> handleChange(event.target.value, "schoolAdmission")}
              />

              <Box textAlign="center">
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={(event) => {
                    event.preventDefault();
                    handleSubmit()
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
