import {
  Button,
  Grid,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { iSchool } from "../../interface/School";
import { getAllSchools } from "../../helpers/APICalls/school";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useStyles from "./useStyles";
import NavBar from "../../components/NavBar/NavBar";

export default function Home(): JSX.Element {
  const [allSchools, setAllSchools] = useState<[iSchool]>();
  const classes = useStyles();

  useEffect(() => {
    async function fetchAllSchools() {
      const response = await getAllSchools();
      if (response) {
        const schools = response.schools;
        const sorted = schools?.sort(function(a,b){ return (new Date(b.creationDate).valueOf() - (new Date(a.creationDate).valueOf()))}) 
        setAllSchools(sorted);
      }
    }
    fetchAllSchools();
  }, []);
  return (
    <Grid container justifyContent="center" className={classes.container}>
      <NavBar />
      <Grid item>
        <Typography className={classes.title}>
          Current Schools
        </Typography>
      </Grid>
      <Grid container item className={classes.listContainer}>
        <ImageList rowHeight={300} className={classes.contestGrid}>
          {allSchools ? (
            allSchools.map((school) => (
              <ImageListItem
                key={school._id}
                cols={ 2 }
                rows={ 1}
              >
                <Button
                  component={Link}
                  to={`/school/${school._id}`}
                  fullWidth={true}
                  disableElevation={true}
                  className={classes.link}
                >
                  <img
                    src={school.schoolImage}
                    alt={school.schoolName}
                    className={classes.contestImage}
                  />
                </Button>

                <ImageListItemBar
                  titlePosition="bottom"
                  subtitle={school.schoolName}
                  actionPosition="left"
                />
              </ImageListItem>
            ))
          ) : (
            <CircularProgress />
          )}
        </ImageList>
      </Grid>
    </Grid>
  );
}
