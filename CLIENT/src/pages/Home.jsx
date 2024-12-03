import { Typography } from "@mui/material";
import TableProducts from "../components/TableProduct";
import ButtonAdProduct from "../components/Button/ButtonAdProduct";
import ButtonAdCategory from "../components/Button/ButtonAdCategory";
import BtnSeeAllCategories from "../components/Button/BtnSeeAllCategories";
import SelectLimitForTable from "../components/Select/SelectLimitForTable";
import PaginatorTableProduct from "../components/Paginator/PaginatorTableProduct";
import SlicerPriceMinMax from "../components/Slicer/SlicerPriceMinMax";
import SelectCategoryForFilter from "../components/Select/SelectCategoryForFilter";
import RadioGroupTriPrice from "../components/RadioGroup/RadioGroupTriPrice";

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
        <div className="mt-3 sm:mt-0 flex-grow">
          <div className="flex gap-4 flex-grow flex-col sm:flex-row justify-end">
            <div className="w-full sm:w-1/3">
              <Typography
                variant="h6"
                sx={{
                  marginRight: "auto",
                }}
              >
                Filter par:
              </Typography>
            </div>
            <div className="w-full sm:w-1/3">
              <SelectCategoryForFilter />
            </div>
            <div className="w-full sm:w-1/3">
              <SelectLimitForTable />
            </div>
          </div>
          <div className="mt-2">
            <RadioGroupTriPrice />
          </div>
          <div className="mt-2 w-full sm:w-full sm:ml-auto">
            <SlicerPriceMinMax />
          </div>
        </div>
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
