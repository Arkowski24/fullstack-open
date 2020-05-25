import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { initUsers } from '../reducers/usersReducer';

const UsersHeader = () => (
  <thead>
    <tr>
      <th />
      <th><b>blogs created</b></th>
    </tr>
  </thead>
);

const UserItem = ({ user }) => {
  return (
    <tr>
      <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
      <td>{user.blogs.length}</td>
    </tr>
  );
};

const UsersPage = () => {
  const users = useSelector(({ users }) => {
    const orderedUsers = users.slice();
    orderedUsers.sort((a, b) => b.blogs.length - a.blogs.length);
    return orderedUsers;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <UsersHeader />
        <tbody>
          {users.map((u) => <UserItem key={u.username} user={u}/>)}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
