import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const Layout: FunctionComponent = () => (
  <main className="d-flex flex-column vh-100">
    <Header />
    <div className="flex-grow-1">{<Outlet />}</div>
    <Footer />
  </main>
);

export default Layout;
