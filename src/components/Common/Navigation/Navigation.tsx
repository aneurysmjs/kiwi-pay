import { FunctionComponent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const Navigation: FunctionComponent = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-md">
      <NavLink to="/" className="navbar-brand">
        <h5 className="font-weight-normal m-0">Dummy</h5>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={(): void => {
          setOpen(!isOpen);
        }}
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className={classNames('collapse navbar-collapse', {
          show: isOpen,
        })}
      >
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
    </nav>
  );
};

export default Navigation;
