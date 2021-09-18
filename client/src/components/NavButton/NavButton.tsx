import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


interface Props {
  to: string;
  primary: string;
}

const NavButton = ({ to, primary }: Props): JSX.Element => {

  return (
    <div>
      <Button component={Link} to={to} color="inherit" variant="contained">
        {primary}
      </Button>
    </div>
  );
};

export default NavButton;
