import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../_actions";

function SuperAdmin() {
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.authentication.user);
  const datas = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getAll());
  }, []);

  function handleDeleteUser(id) {
    dispatch(userActions.delete(id));
  }
  console.log(datas)

  return (
    <div>
      <div className="row">
            <div className="col-11">
              <h1>
                Hi {user.firstName} {user.lastName} Welcome to Super Admin Page
              </h1>
            </div>
            <div className="col">
              <p>
                <Link to="/login">Logout</Link>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-3 bg-light m-1">
              <h3>All registered users:</h3>
              {users.loading && <em>Loading users...</em>}
              {users.error && (
                <span className="text-danger">ERROR: {users.error}</span>
              )}
              {users.items && (
                <ul>
                  {users.items.map((user, index) => (
                    <li key={user.id}>
                      {user.firstName + " " + user.lastName+" ("+user.username+")"}
                      {user.deleting ? (
                        <em> - Deleting...</em>
                      ) : user.deleteError ? (
                        <span className="text-danger">
                          {" "}
                          - ERROR: {user.deleteError}
                        </span>
                      ) : (
                        <span>
                          {" "}
                          -{" "}
                          <a
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-primary"
                          >
                            Delete
                          </a>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="col bg-light m-1">
            <ul>
                <li>Super_Admin have access to delete user account</li>
                <li>Super_Admin can approve user 1 and user 2 Details</li>
              </ul>
            </div>
          </div>
         <h4 className="text-center">User Requested Data</h4> 
          <div className="row">
          <div className="col-6 m-1 bg-light text-center">
          <h4>User1 Request Data</h4>
          
         



          </div>
            <div className="col bg-light text-center m-1">User2 Request Data</div>
          </div>
          <div className="row bg-dark text-white m-4">
            <div className="col text-center">All Data</div>
          </div>
    </div>
  );
}

export { SuperAdmin };
