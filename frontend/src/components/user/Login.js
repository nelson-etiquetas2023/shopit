import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../redux/features/user/userThunks.js";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader.js";
import MetaData from "../layout/MetaData.js";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      toast("los datos son correctos...");
      navigate("/");
    }

    if (error) {
      dispatch(clearErrors);
    }
  }, [dispatch, isAuthenticated, error, navigate, email, password]);

  if (error) {
    toast("se produjo un error...");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"login"} />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form
                onSubmit={submitHandler}
                className="shadow rounded bg-body"
                method="post">
                <h2 className="mb-4">Login</h2>
                <div className="mb-3">
                  <label htmlFor="email_field" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password_field" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Link to="/password/forgot" className="float-end mb-4">
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn w-100 py-2">
                  LOGIN
                </button>

                <div className="my-3">
                  <Link to="/register" className="float-end">
                    New User?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
      <ToastContainer
        position="botton-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Fragment>
  );
};

export default Login;
