import React from "react";
import {Link} from 'react-router-dom';

const Product = ({ product }) => {
  return (
    
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src={product.images[0].url}
          alt="foto del producto"
        />
        <div className="card-body ps-3 d-flex justify-content-center flex-column">
          <div>
            <h5 className="card-title">
              <Link to={`/product/${product._id}`}>{product.nameProduct}</Link>
            </h5>
          </div>
          <div className="ratings mt-auto d-flex">
            <div
              className="star-ratings"
              style={{ width: `${product.ratings}` }}>
              <i className="fa fa-star star-active"></i>
              <i className="fa fa-star star-active"></i>
              <i className="fa fa-star star-active"></i>
              <i className="fa fa-star star-active"></i>
              <i className="fa fa-star star-active"></i>
            </div>
            <span id="no_of_reviews" className="pt-2 ps-2">
              {" "}
              ({product.numofReviews}) Reviews
            </span>
          </div>
          <p className="card-text mt-2">${product.price}</p>
          <Link to={`/product/${product._id}`} id="review_btn" className="btn btn-block">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
