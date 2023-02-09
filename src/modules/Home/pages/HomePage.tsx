import { FunctionComponent } from 'react';

import './HomePage.scss';

const HomePage: FunctionComponent = () => {
  return (
    <section>
      <h2 data-testid="page-title" className="home-title">
        home
      </h2>
    </section>
  );
};

export default HomePage;
