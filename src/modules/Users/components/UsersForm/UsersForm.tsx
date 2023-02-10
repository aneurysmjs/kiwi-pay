import { FunctionComponent, FormEventHandler, useState } from 'react';

import type { User } from '@/store/modules/users/types';

interface UsersFormProps {
  onSubmit: (user: User) => Promise<void>;
}

interface FormState {
  status: string;
  error: null | string;
}

const UsersForm: FunctionComponent<UsersFormProps> = ({ onSubmit }) => {
  const [userState, setUserState] = useState<User>({} as User);

  const [{ status, error }, setState] = useState<FormState>({
    status: 'idle',
    error: null,
  });

  const handleChange = {}

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    // const newUsername = (event.target as HTMLFormElement).elements.username.value;
    setState({ status: 'pending', error: null });
    try {
      await onSubmit(userState);
      setState({ status: 'fulfilled', error: null });
    } catch (err) {
      setState({ status: 'rejected', error: (err as Error).message });
    }
  };

  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input type="text" className="form-control" id="name" name="name" />
      </div>
      <div className="col-md-6">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input type="text" className="form-control" id="username" name="username" />
      </div>
      <div className="col-6">
        <label htmlFor="userAddress" className="form-label">
          Address
        </label>
        <input type="text" className="form-control" id="userAddress" placeholder="1234 Main St" />
      </div>
      <div className="col-md-6">
        <label htmlFor="userCity" className="form-label">
          City
        </label>
        <input type="text" className="form-control" id="userCity" />
      </div>
      <div className="col-md-2">
        <label htmlFor="inputZip" className="form-label">
          Zip
        </label>
        <input type="text" className="form-control" id="inputZip" />
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
  s;
};

export default UsersForm;
