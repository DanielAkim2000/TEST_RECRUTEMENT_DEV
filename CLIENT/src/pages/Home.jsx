import React from "react";
import { useGetProductsQuery } from "../api/slices/product.slice";

const Home = () => {
  const { data, error, isLoading } = useGetProductsQuery();
  console.log(data, error, isLoading);
  return <div>Home</div>;
};

export default Home;
