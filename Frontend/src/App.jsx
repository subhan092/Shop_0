import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ActivationPage,
  EventPage,
  Login,
  Signup,
  UserOrderDetailpage,
} from "./Routes";
import {
  Homepage,
  Productpage,
  BestSelling,
  FaqPage,
  ProductDetailPage,
  ProfilePage,
  ShopCreatepage,
  ShopLoginPage,
} from "./Routes";

import {
  ShopHomePage,
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAlloOders,
  ShopOrderDetailsPage,
  ShopActivation,
  ShopPreviewPage,
  PendingApproval,
} from "./ShopRoutes";

import ShopProductsPage from "./pages/Shop/ShopProductsPage";

import {
  AdminDashboardPage,
  AllSellerPage,
  SellerRequestPage,
  ManageSellersPage,
  AdminProductList,
} from "./AdminRoutes";
import ShopStatus from "./components/Admin/ShopStatus";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "./Redux/store";
import { looadUser } from "./Redux/actions/user";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Watch } from "react-loader-spinner";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import { loadSeller } from "./Redux/actions/seller";
import SellerProtectedRoute from "./protectedRoutes/SellerProtectedRoute";
import { getAllProducts } from "./Redux/actions/product";
import Sucess from "./components/checkout/SucessPage";
import Cancel from "./components/checkout/Cancel";
import SucessPage from "./components/checkout/SucessPage";
import AdminProtectedroute from "./protectedRoutes/AdminProtectedroute";

function App() {
  // const { loading, isAuthenticated } = useSelector((state) => state.user);
  // const {allProducts} = useSelector((state)=>state.products);

  useEffect(() => {
    Store.dispatch(looadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Productpage />} />
          <Route path="/product/:name" element={<ProductDetailPage />} />
          <Route path="/best-selling" element={<BestSelling />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/order/:id"
            element={
              <SellerProtectedRoute>
                <UserOrderDetailpage />
              </SellerProtectedRoute>
            }
          />

          {/* shop routes */}
          <Route path="/shop-create" element={<ShopCreatepage />} />
          <Route path="/shop-login" element={<ShopLoginPage />} />
          <Route
            path="/shop/:id"
            element={
              <SellerProtectedRoute>
                <ShopHomePage />
              </SellerProtectedRoute>
            }
          />

          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
          <Route
            path="/dashboard"
            element={
              <SellerProtectedRoute>
                <ShopDashboardPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-product"
            element={
              <SellerProtectedRoute>
                <ShopCreateProduct />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-products"
            element={
              <SellerProtectedRoute>
                <ShopProductsPage />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/dashboard-orders"
            element={
              <SellerProtectedRoute>
                <ShopAlloOders />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/order/:id"
            element={
              <SellerProtectedRoute>
                <ShopOrderDetailsPage />
              </SellerProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <AdminProtectedroute>
                <AdminDashboardPage />
              </AdminProtectedroute>
            }
          />
          <Route
            path="/all-sellers"
            element={
              <AdminProtectedroute>
                <AllSellerPage />
              </AdminProtectedroute>
            }
          />
          <Route
            path="/seller-request"
            element={
              <AdminProtectedroute>
                <SellerRequestPage />
              </AdminProtectedroute>
            }
          />
          <Route
            path="/shop-info/:id"
            element={
              <AdminProtectedroute>
                <ShopStatus />
              </AdminProtectedroute>
            }
          />

          <Route
            path="/admin/product-list/:id"
            element={
              <AdminProtectedroute>
                <AdminProductList />
              </AdminProtectedroute>
            }
          />

          <Route
            path="/admin/all-products"
            element={
              <AdminProtectedroute>
                <ManageSellersPage />
              </AdminProtectedroute>
            }
          />

          {/* activation page */}
          <Route
            path="/activation/:activationToken"
            element={<ActivationPage />}
          />

          <Route
            path="/seller/activation/:activationToken"
            element={<ShopActivation />}
          />
          <Route path="/pending-approval" element={<PendingApproval />} />

          {/* payment routes */}
          <Route path="/success-payment" element={<SucessPage />} />
          <Route path="/cancel-payment" element={<Cancel />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition:Bounce
        />
        {/* Same as */}
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
