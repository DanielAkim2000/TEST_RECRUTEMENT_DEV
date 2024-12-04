import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import { Container } from "@mui/material";

const Layout = () => {
  return (
    <div>
      <Header />
      <Container maxWidth="xl" className="mt-10 pb-10">
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
