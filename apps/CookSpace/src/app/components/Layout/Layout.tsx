import React from 'react';
// components
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { ToastContainer } from 'react-toastify';
// styles
import styles from './Layout.module.css';
import 'react-toastify/dist/ReactToastify.css';

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <div className={styles.layout}>
      <Header />
      <ToastContainer />
      <section>{children}</section>
      <Footer />
    </div>
  );
};

export default Layout;
