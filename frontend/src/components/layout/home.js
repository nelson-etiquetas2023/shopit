import React, { Fragment } from "react";

const Home = () => {
  return (
    <Fragment>
      <h1 id="products_heading" className="text-secondary">
        Latest Products
      </h1>
      <section id="products" className="mt-5">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
              <div className="card p-3 rounded">
                <img
                  className="card-img-top mx-auto"
                  src="./images/default_product.png"
                  alt=""
                />
              </div>
              <div className="card-body ps-3 d-flex justify-content-center flex-column">
                <div>
                  <h5 className="card-title">
                    <a href="https://www.example.com">Product Name 1</a>
                  </h5>
                </div>
                <div className="ratings mt-auto d-flex">
                  <div className="star-ratings">
                    <i className="fa fa-star star-active"></i>
                    <i className="fa fa-star star-active"></i>
                    <i className="fa fa-star star-active"></i>
                    <i className="fa fa-star star-active"></i>
                    <i className="fa fa-star star-active"></i>
                  </div>
                  <span id="no_of_reviews" className="pt-2 ps-2">
                    {" "}
                    (0){" "}
                  </span>
                </div>
                <p className="card-text mt-2">$100</p>
                <a href="www" id="review_btn" class="btn btn-block">
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
