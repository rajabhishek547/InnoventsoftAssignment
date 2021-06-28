import React, {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../_actions";
import { User2Page } from "../User2";
import {User1Page} from "../User1";
import {PowerAdmin} from "../PoweAdmin"
import {SuperAdmin} from "../SuperAdmin"
function HomePage() {
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.getAll());
  }, []);
  return (
    <div>
      {user.username === "Super_Admin" ? (
        <div>
         <SuperAdmin/>
        </div>
      ) : user.username === "Power_Admin" ? (
        <div>
         <PowerAdmin/>
        </div>
      ) : user.username === "User1" ? (
        <div>
      <User1Page/>
        </div>
      ) : user.username === "User2" ? (
        <div>
         <User2Page/>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export { HomePage };
