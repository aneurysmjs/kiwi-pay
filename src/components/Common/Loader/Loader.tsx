import { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

const Loader: FunctionComponent = () => <FontAwesomeIcon icon={faSpinner} />;

export default Loader;
