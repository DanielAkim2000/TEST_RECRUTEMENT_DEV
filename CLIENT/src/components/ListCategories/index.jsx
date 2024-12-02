// import React from "react";
// import { useGetCategoriesQuery } from "../../api/slices/category.slice";

// const ListCategories = () => {
//   const { data: categories } = useGetCategoriesQuery();
//   const [value, setValue] = React.useState("default");
//   const [categoriesAffiched, setCategoriesAffiched] = React.useState([]);
//   const [isExpanding, setIsExpanding] = React.useState(false);

//   React.useEffect(() => {
//     if (categories) {
//       setCategoriesAffiched(categories.slice(0, 5));
//     }
//   }, [categories]);

//   const toggleCategories = () => {
//     if (categoriesAffiched?.length === categories?.length) {
//       setIsExpanding(false); // Pas de transition lors de la réduction
//       setCategoriesAffiched(categories.slice(0, 5));
//     } else {
//       setIsExpanding(true); // Transition lors de l'extension
//       setCategoriesAffiched(categories);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-3 my-3 items-start">
//       <div
//         className={`flex flex-row flex-wrap w-full gap-2 ${
//           isExpanding ? "transition-all duration-500" : ""
//         } ${
//           isExpanding ? "max-h-[500px] opacity-100" : "max-h-[60px] opacity-80"
//         } overflow-hidden`}
//       >
//         <button
//           onClick={() => setValue("default")}
//           className={`border-orange-main max-w-52 ${
//             value === "default" ? "bg-orange-main text-white" : "bg-white"
//           } font-bold py-2 px-4 rounded-xl`}
//         >
//           Tous
//         </button>
//         {categoriesAffiched?.map((category) => (
//           <button
//             key={category.id}
//             onClick={() => setValue(category.id)}
//             className={`border-orange-main ${
//               value === category.id ? "bg-orange-main text-white" : "bg-white"
//             } font-bold py-2 px-4 rounded-xl`}
//           >
//             {category.name}
//           </button>
//         ))}
//       </div>
//       <button
//         className="text-primary-main underline font-semibold"
//         onClick={toggleCategories}
//       >
//         {categoriesAffiched?.length === categories?.length
//           ? "Voir moins"
//           : "Voir plus"}
//       </button>
//     </div>
//   );
// };

// export default ListCategories;
