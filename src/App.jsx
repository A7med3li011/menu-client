import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Categories from "./pages/Categories";
import SubCategories from "./pages/SubCategories";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import OfferDetails from "./pages/OfferDetails";
import NotFound from "./pages/NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Categories />,
    },
    {
      path: "/categories",
      element: <Categories />,
    },
    {
      path: "/category/:categoryId/subcategories",
      element: <SubCategories />,
    },
    {
      path: "/subcategory/:subCategoryId/products",
      element: <Products />,
    },
    {
      path: "/product/:productId",
      element: <ProductDetails />,
    },
    {
      path: "/offer/:offerId",
      element: <OfferDetails />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
