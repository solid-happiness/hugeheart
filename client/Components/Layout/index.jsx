import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../SiteHeader';
import Footer from '../Footer';
import { setUserData } from '../../actions/user';

const Layout = ({ children, dispatchUserData, history }) => {
  React.useEffect(() => {
    const loadUserData = async () => {
      const userData = await (await fetch(
        '/api/user-profile/',
        {
          method: 'GET',
          credentials: 'same-origin',
        },
      )).json();

      if (userData.auth) {
        dispatchUserData(userData);
        return;
      }

      const isProfileLink = window.location.href.includes('profile');
      if (isProfileLink) {
        history.push('/');
      }
    };

    loadUserData();
  }, []);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};


Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
};

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = dispatch => ({
  dispatchUserData: data => dispatch(setUserData(data)),
});

Layout.propTypes = {
  dispatchUserData: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));
