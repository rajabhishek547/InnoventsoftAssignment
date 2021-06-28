import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../_actions";

function User2Page() {
  const datas = useSelector((state) => state);
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: '',
    email:''
});
const [submitted, setSubmitted] = useState(false);
const registering = useSelector(state => state.registration.registering);
  useEffect(() => {
    dispatch(userActions.getAll());
  }, []);
function handleChange(e) {
  const { name, value } = e.target;
  setData(data => ({ ...data, [name]: value }));
}
function handleSubmit(e) {
  e.preventDefault();

  setSubmitted(true);
  if (data.name && data.email) {
      dispatch(userActions.newdata(data));
  }
}
  return (
    <div>
      <div className="row">
        <div className="col-11">
          <h1>
            Hi {user.firstName} {user.lastName} This is User 2 Page
          </h1>
        </div>
        <div className="col">
          <Link to="/login">Logout</Link>
        </div>
      </div>
      <div className="row">
        <div className="col-6 m-1 bg-light">
        <h4>Upload Page</h4>

<form name="form" onSubmit={handleSubmit}>
        <div className="form-group">
            <label>name</label>
            <input type="text" name="name" value={data.name} onChange={handleChange} className={'form-control' + (submitted && !data.name ? ' is-invalid' : '')} />
            {submitted && !data.name &&
                <div className="invalid-feedback">Name is required</div>
            }
        </div>
        <div className="form-group">
            <label>email</label>
            <input type="text" name="email" value={data.email} onChange={handleChange} className={'form-control' + (submitted && !data.email ? ' is-invalid' : '')} />
            {submitted && !data.email &&
                <div className="invalid-feedback">email is required</div>
            }
        </div>
        <div className="form-group">
            <button className="btn btn-primary">
            {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                Send data for verification
                
            </button>
        </div>
    </form>

        </div>

        <div className="col m-1 bg-light">approved data</div>
      </div>
      
    </div>
  );
}

export { User2Page };
