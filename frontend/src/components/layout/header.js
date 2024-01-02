import React, { Fragment } from "react";
import "../../App.css";
import Search from "./Search";
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3 ps-5">
          <div className="navbar-brand">
            <a href="/">
              <img src="/images/logo.png" alt="ShopIT Logo" />
            </a>
          </div>
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search/>
        </div>
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <a href="/cart">
            <span id="cart-item"> Cart </span>
            <span className="ms-1" id="cart_count">
              3
            </span>
          </a>

          <div className="ms-4 dropdown">
            <button
              className="btn dropdown-toggle text-white"
              type="button"
              id="dropDownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <figure className="avatar avatar-nav">
                <img
                  src="/images/avatar.png"
                  alt="User Avatar"
                  className="rounded-circle"
                />
              </figure>
              <span>User</span>
            </button>
            <div
              className="dropdown-menu w-100"
              aria-labelledby="dropDownMenuButton">
              <a className="dropdown-item" href="/admin/dashboard">
                {" "}
                Dashboard{" "}
              </a>

              <a className="dropdown-item" href="/me/orders">
                {" "}
                Orders{" "}
              </a>

              <a className="dropdown-item" href="/me/profile">
                {" "}
                Profile{" "}
              </a>

              <a className="dropdown-item text-danger" href="/">
                {" "}
                Logout{" "}
              </a>
            </div>
          </div>

          <Link to="/login" className="btn ms-4" id="login_btn">
            {" "}
            Login{" "}
          </Link>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
