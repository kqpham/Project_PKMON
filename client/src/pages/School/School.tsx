import { useState, useEffect } from "react";
import { getSchoolById } from "../../helpers/APICalls/school";
import { useParams } from "react-router";
import { iSchool } from "../../interface/School";
import CircularProgress from "@material-ui/core/CircularProgress";
import NavBar from "../../components/NavBar/NavBar";
import { Grid, Button, Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./useStyles";

interface RouteParams {
  id: string;
}

export default function School(): JSX.Element {
  const [schoolCard, setSchoolCard] = useState<iSchool>(Object);
  const [sessionId, setSessionId] = useState<String>();
  const classes = useStyles();

  const params = useParams<RouteParams>();

  useEffect(() => {
    async function fetchSchoolById() {
      const response = await getSchoolById(params.id);
      if (response) {
        const school = response.school;
        if (school) {
          setSchoolCard(school);
        }
      }
    }
    if (params) {
      fetchSchoolById();
    }
  }, [params]);

  useEffect(() => {
    function getExpiredKey() {
      const localItem = localStorage.getItem("sessionId");
      if (!localItem) {
        return null;
      }
      const item = JSON.parse(localItem);
      const now = new Date();
      if (now.getTime() > item.expiry) {
        localStorage.removeItem("sessionId");
        return null;
      }
      setSessionId(item.value);
    }
    getExpiredKey();

  }, []);



  return (
    <Grid container direction="column" justify="center" className={classes.container}>
      <NavBar />
      {schoolCard ? (
        (schoolCard.creatorId === sessionId) ? ( 
          <Box>
          <Button component={Link} to={`/update/${params.id}`}>Update</Button>
          <img src={schoolCard.schoolImage}/>
          <Grid item>
            <Typography>{schoolCard.schoolName}</Typography>
            <Typography>{schoolCard.schoolAbout}</Typography>
            <Typography>{schoolCard.schoolLocation}</Typography>
            <Typography>{schoolCard.schoolAdmission}</Typography>
          </Grid>
          </Box>
        ) : (
          <Box>
          <img
              src={schoolCard.schoolImage}
              alt={`picture of ${schoolCard.schoolName}`}
            />
            <Grid item>
            <Typography>{schoolCard.schoolName}</Typography>
            <Typography>{schoolCard.schoolAbout}</Typography>
            <Typography>{schoolCard.schoolLocation}</Typography>
            <Typography>{schoolCard.schoolAdmission}</Typography>
          </Grid>
          </Box>     
          )

      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
}
