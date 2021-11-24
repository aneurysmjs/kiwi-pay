import { FunctionComponent } from 'react';

const Footer: FunctionComponent = () => (
  <footer className="container-fluid pt-4 border-top text-center">
    <div className="row">
      <div className="col-12 col-md">
        Playground
        <small className="d-block mb-3 text-muted">&copy; {new Date().getFullYear()}</small>
      </div>
      <div className="col-6 col-md">
        <h5>Some Links 1</h5>
        <ul className="list-unstyled text-small">
          <li>
            <a className="text-muted" href="#">
              Info 1
            </a>
          </li>
        </ul>
      </div>
      <div className="col-6 col-md">
        <h5>Some Links 2</h5>
        <ul className="list-unstyled text-small">
          <li>
            <a className="text-muted" href="#">
              Info 2
            </a>
          </li>
        </ul>
      </div>
      <div className="col-6 col-md">
        <h5>Some Links 3</h5>
        <ul className="list-unstyled text-small">
          <li>
            <a className="text-muted" href="#">
              Info 3
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
