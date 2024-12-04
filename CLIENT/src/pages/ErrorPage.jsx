import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-24 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-500">404</h1>
        <p className="text-gray-500">Page non trouvée</p>
        <Link
          to="/"
          className="mt-4 block text-center bg-red-500 text-white font-bold py-2 px-4 rounded"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
