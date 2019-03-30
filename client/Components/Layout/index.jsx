import React from 'react';
import PropTypes from 'prop-types';
import Header from '../SiteHeader';
import Footer from '../Footer';

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
};

export default Layout;
