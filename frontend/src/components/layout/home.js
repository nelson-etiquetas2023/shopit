import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./MetaData.js";
import { useDispatch, useSelector } from "react-redux";
import { getproducts } from "../../redux/features/productThunks.js";
import Product from "../product/Product.js";
import Loader from './Loader.js';
import Pagination from 'react-js-pagination';
import { useParams } from "react-router-dom";

const Home = () => {

  const[currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { loading, products, productCount ,resPerPage } = useSelector(
    (state) => state.products
  );

  const {keyword} = useParams();

  useEffect(() => {

    dispatch(getproducts(keyword, currentPage));

  }, [dispatch, keyword, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber)
  }

  return (
    <Fragment>
      {loading ? <Loader /> : (
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

            {resPerPage <= productCount && (
              <div className="d-flex justify-content-center mt-5"> 
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resPerPage}
                      totalItemsCount={productCount}
                      onChange={setCurrentPageNo}
                      nextPageText = {'Next'} 
                      prevPageText = {'Prev'}
                      firstPageText = {'First'}
                      lastPageText = {'Last'}
                      itemClass = "page-item"
                      linkClass = "page-link "
                    />
            </div>
            )}
            
          </div>         
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
