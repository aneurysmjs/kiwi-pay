import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: FunctionComponent = () => {
  return (
    <nav className="navbar navbar-expand-md">
      <NavLink to="/" className="navbar-brand">
        <h5 className="font-weight-normal m-0">Kiwi Pay</h5>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="navbar-collapse">
        <ul className="navbar nav ml-auto">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/princing" className="nav-link">
              Pricing
            </NavLink>
          </li>
        </ul>
      </div>
      {/* <button className="btn btn-outline-primary">Sign up</button> */}
    </nav>
  );
};

export default Navigation;
