import React, { PropTypes } from 'react';
import { Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading}) => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="about" activeClassName="active">About</Link>
      {" | "}
      <Link to="courses" activeClassName="active">Courses</Link>
      {loading && <LoadingDots interval={100} dots={20}/>} {/* right hand side of this expression will only evaluate if loading is true */}
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
