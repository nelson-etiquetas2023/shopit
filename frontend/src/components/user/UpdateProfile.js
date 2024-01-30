import React, { Fragment, useState, useEffect } from "react";
import Metadata from "../layout/MetaData.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PROFILE_RESET } from "../../redux/features/user/userSlice.js";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../redux/features/user/userThunks.js";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/avatar.png");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading, isUpdate } = useSelector((state) => state.auth);

  useEffect(() => {
    //actualizar el state de user.
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    //si se generan errores.
    if (error) {
      toast("Se produjo un error en profile...");
      dispatch(clearErrors);
    }

    //guardar los datos.
    if (isUpdate) {
      toast("User update successfully");
      dispatch(loadUser);

      navigate("/me");
      dispatch(UPDATE_PROFILE_RESET());
    }
  }, [dispatch, error, isUpdate, navigate, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("id", user._id);
    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", avatar);

    dispatch(updateProfile(formData));
  };

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setAvatar(reader.result);
    };
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    previewFiles(file);
  };

  return (
    <Fragment>
      <Metadata title={"Update Profile"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data">
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
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
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div>
                  <input
                    type="file"
                    name="avatar"
                    className="form-control mb-3"
                    id="customFile"
                    accept="image/*"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}>
              Update
            </button>
          </form>
        </div>
      </div>

      <ToastContainer
        position="top-right"
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

export default UpdateProfile;
