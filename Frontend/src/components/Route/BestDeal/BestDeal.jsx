import React, { useState, useEffect } from "react";
import styles from "../../../styles/styles";
import { productData } from "../../../static/data";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";

const BestDeal = () => {
  const {allProducts} = useSelector((state) => state.products);
const [data, setData] = useState([]);

  useEffect(() => {
    console.log("all products",allProducts);
    const topfive = allProducts.slice(0, 5);


    setData(topfive);
  }, []);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-col-1 gap-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mx-2 mb-10 ">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default BestDeal;
