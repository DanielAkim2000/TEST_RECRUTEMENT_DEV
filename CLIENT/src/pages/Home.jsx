import React from "react";
import { Typography } from "@mui/material";
import TableProducts from "../components/TableProduct";
import ButtonAdProduct from "../components/Button/ButtonAdProduct";
import ButtonAdCategory from "../components/Button/ButtonAdCategory";
import BtnSeeAllCategories from "../components/Button/BtnSeeAllCategories";
import SelectLimitForTable from "../components/Select/SelectLimitForTable";
import PaginatorTableProduct from "../components/Paginator/PaginatorTableProduct";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-grow">
          <Typography variant="h4" sx={{ fontWeight: "900", marginBottom: 5 }}>
            Bienvenue sur{" "}
            <span className="rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-xl rounded-bl-xl bg-primary-main text-white px-3 font-extrabold">
              Prodify
            </span>
          </Typography>
          <Typography variant="h5">Liste des produits</Typography>
        </div>
        <SelectLimitForTable />
      </div>
      {/* <Typography variant="h5">Liste des catégories</Typography>
      <ListCategories /> */}

      <div className="my-5 sm:flex gap-5 hidden ">
        <ButtonAdProduct />
        <ButtonAdCategory />
        <div className="ml-auto mr-auto sm:mr-0">
          <BtnSeeAllCategories />
        </div>
      </div>
      <TableProducts />
      <div className="flex justify-center mt-10">
        <PaginatorTableProduct />
      </div>
    </div>
  );
};

export default Home;
