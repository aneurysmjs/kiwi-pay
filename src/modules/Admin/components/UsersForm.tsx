import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import isEmpty from 'ramda/src/isEmpty';

import { useUserActions } from '@/store/modules/users/actions';
import { selectUsers } from '@/store/modules/users/selectors';
import './UsersForm.scss';

function GloverForm() {
  const [name, setName] = useState('');
  const state = useSelector(selectUsers);

  const { getUsers } = useUserActions();

  useEffect(() => {
    if (isEmpty(state)) {
      getUsers();
    }
  }, [getUsers, state]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // addUser(name);
    setName('');
  };

  const handleChange = (evt) => {
    setName(evt.target.value);
  };

  const handleRemove = (id: string | number) => {
    // remo(id);
  };

  return (
    <form className="users-form" onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          type="text"
          className="form-control"
          placeholder="Input Glover's name"
          value={name}
          onChange={handleChange}
        />

        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
          Add
        </button>
      </div>

      <ul className="list-group">
        {state.length &&
          state.map((glover) => (
            <li key={glover.id} className="list-group-item" data-test-id="glovers-list">
              <div className="d-flex  justify-content-around">
                <span>{glover.name}</span>
                <button className="btn btn-primary" onClick={() => handleRemove(glover.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
      </ul>
    </form>
  );
}

export default GloverForm;
