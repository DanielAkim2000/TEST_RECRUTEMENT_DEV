import React from "react";
import { Typography } from "@mui/material";
import TableProducts from "../components/TableProduct";
import ButtonAdProduct from "../components/Button/ButtonAdProduct";
import ButtonAdCategory from "../components/Button/ButtonAdCategory";
import BtnSeeAllCategories from "../components/Button/BtnSeeAllCategories";

const Home = () => {
  return (
    <div>
      <Typography variant="h4" sx={{ fontWeight: "900", marginBottom: 5 }}>
        Bienvenue sur{" "}
        <span className="rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-xl rounded-bl-xl bg-primary-main text-white px-3 font-extrabold">
          Prodify
        </span>
      </Typography>
      {/* <Typography variant="h5">Liste des catégories</Typography>
      <ListCategories /> */}
      <Typography variant="h5">Liste des produits</Typography>
      <div className="my-5 flex flex-row gap-5">
        <ButtonAdProduct />
        <ButtonAdCategory />
        <div className="ml-auto">
          <BtnSeeAllCategories />
        </div>
      </div>
      <TableProducts />
    </div>
  );
};

export default Home;
