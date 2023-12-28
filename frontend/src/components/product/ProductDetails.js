import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductId, ClearErrors } from "../../redux/features/productThunks";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import { Carousel } from 'react-bootstrap';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.products);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductId(id));
  }, [dispatch, id]);

  if (!product) {
    return;
  }
  console.log(id);
  console.log(product);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel pause='hover'>
                {product.images && product.images.map(image => (
                  <Carousel.Item key={image.public_id}>
                    <img className="d-block w-100" src={image.url} alt={product.title} />
                  </Carousel.Item>
                ))}
              </Carousel>



              <div className="row justify-content-start mt-5">
                <div className="col-2 ms-4 mt-2">
                  <a href="/" role="button">
                    <img
                      className="d-block border rounded p-3 cursor-pointer"
                      height="100"
                      width="100"
                      src="./images//default_product.png"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.nameProduct}</h3>
              <p id="product_id">Product # {product._id}</p>

              <hr />

              <div className="d-flex">
                <div className="star-ratings" style={{width: `${(product.ratings / 5) * 100}%`}}>
                  <i className="fa fa-star star-active"></i>
                  <i className="fa fa-star star-active"></i>
                  <i className="fa fa-star star-active"></i>
                  <i className="fa fa-star star-active"></i>
                  <i className="fa fa-star star-active"></i>
                </div>
                <span id="no-of-reviews" className="pt-1 ps-2">
                  {" "}
                  ({product.numofReviews} Reviews){" "}
                </span>
              </div>
              <hr />

              <p id="product_price">${product.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus">-</span>
                <input type="number" className="form-control count d-inline" />
                <span className="btn btn-primary plus">+</span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ms-4"
                disabled="">
                Add to Cart
              </button>

              <hr />

              <p>
                Status:{" "}
                <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Sold by: <strong>{product.seller}</strong>
              </p>

              <div className="alert alert-danger my-5" type="alert">
                Login to post your review.
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
