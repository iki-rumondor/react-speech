import React from 'react';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  // Fungsi untuk memuat CSS berdasarkan rute yang aktif
  const loadCSS = () => {
    if (location.pathname === '/') {
      return <link rel="stylesheet" type="text/css" href="dashboard.css" />;
    } else {
      return <link rel="stylesheet" type="text/css" href="landingPage.css" />;
    }
  };

  return (
    <>
      {/* Muat CSS sesuai dengan rute yang aktif */}
      {loadCSS()}
      {/* Render konten anak */}
      {children}
    </>
  );
}

export default Layout;
