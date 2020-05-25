import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { initUsers } from '../reducers/usersReducer';

const UserPage = () => {
  const { id } = useParams();
  const user = useSelector(({ users }) => users.find((u) => u.id === id));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  if(!user) return null;
  return(
    <div>
      <h2>{user.name}</h2>
      <p><b>added blogs</b></p>
      <ul>
        {user.blogs.map((b) => <li key={b.title}>{b.title}</li>)}
      </ul>
    </div>
  );
};

export default UserPage;
