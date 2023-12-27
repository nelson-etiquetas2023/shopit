import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData.js";
import { useDispatch, useSelector } from "react-redux";
import { getproducts } from "../../redux/features/productThunks";
import Product from "../product/Product.js";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getproducts());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products Online"} />
          <div className="container container-fluid">
            <h1 id="products_heading" className="text-secondary">
              Latest Products
            </h1>
            <section id="products" className="mt-5">
              <div className="row">
                {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
            </section>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
