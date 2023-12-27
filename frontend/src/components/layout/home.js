import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData.js";
import { useDispatch, useSelector } from "react-redux";
import { getproducts } from "../../redux/features/productThunks";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );

  console.log(products);
  useEffect(() => {
    dispatch(getproducts());
  }, [dispatch]);

  return (
    <Fragment>
      <MetaData title={"Buy Best Products Online"} />
      <div className="container container-fuild">
        <h1 id="products_heading" className="text-secondary">
          Latest Products
        </h1>
        <section id="products" className="mt-5">
          <div className="row">
            {products &&
              products.map((product) => (
                <div key={product._id} className="col-sm-12 col-md-6 col-lg-3 my-3">
                  <div className="card p-3 rounded">
                    <img
                      className="card-img-top mx-auto"
                      src={product.images[0].url}
                      alt="foto del producto"
                    />
                    <div className="card-body ps-3 d-flex justify-content-center flex-column">
                      <div>
                        <h5 className="card-title">
                          <a href="#">{product.nameProduct}</a>
                        </h5>
                      </div>
                      <div className="ratings mt-auto d-flex">
                        <div className="star-ratings" style={{ width: `${(product.ratings)}`}}>
                          <i className="fa fa-star star-active"></i>
                          <i className="fa fa-star star-active"></i>
                          <i className="fa fa-star star-active"></i>
                          <i className="fa fa-star star-active"></i>
                          <i className="fa fa-star star-active"></i>
                        </div>
                        <span id="no_of_reviews" className="pt-2 ps-2">
                          {" "}
                          ({product.numofReviews}){" "}
                        </span>
                      </div>
                      <p className="card-text mt-2">${product.price}</p>
                      <a href="www" id="review_btn" class="btn btn-block">
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Home;
