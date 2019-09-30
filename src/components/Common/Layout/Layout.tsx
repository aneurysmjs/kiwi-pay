import React from 'react';

import Header from '~/components/common/Header';
import Footer from '~/components/common/Footer';

type PropsType = {
  children: Array<JSX.Element> | JSX.Element;
};

const Layout = (props: PropsType): JSX.Element => (
  <main className="d-flex flex-column">
    <Header />
    <div className="flex-grow-1">{props.children}</div>
    <Footer />
  </main>
);

export default Layout;
