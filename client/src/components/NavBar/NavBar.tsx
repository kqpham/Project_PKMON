import { Link } from "react-router-dom";
import Logo from "../../assets/logoDreamSchool.png";
import {
  Box,
  Typography,
  AppBar,
  Button,
  Toolbar,
  Container,
} from "@material-ui/core";
import NavButton from "../NavButton/NavButton";
import useStyles from "./useStyles";

const NavBar = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Box p={1} className={classes.chatSideBanner}>
      <AppBar className={classes.toolBar}>
        <Toolbar>
          <Container>
            <Link to={"/"} className={classes.link}>
              <Button className={classes.navButton} color="inherit" variant="contained">
                <img className={classes.logo} src={Logo} alt={"Logo"} />
              </Button>
            </Link>
          </Container>
          <NavButton to="/create" primary="Create School" />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
