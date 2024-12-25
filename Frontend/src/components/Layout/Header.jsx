import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles.js";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import { categoriesData, productData } from "../../static/data";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { CgProfile } from "react-icons/cg";
import Cart from "../Cart/Cart.jsx";
import Wishlist from "../Wishlist/Wishlist.jsx";
import { useSelector } from "react-redux";
import { backend_url } from "../../Url.js";
import {getUserRole} from "../Jwt_decode.js";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { seller } = useSelector((state) => state.seller);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const { allProducts } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.allcart);
  const { wishlist } = useSelector((state) => state.allwishlist);

  const navigate = useNavigate();

  console.log("user is", user);
  const role = getUserRole();

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
    console.log(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section}`}>
        <div className=" 800px:h-[50px] 800px:my-[20px] md:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e)}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] w-full bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.name;
                    const Product_Name = d.replace(/\s+/g, "-");
                    return (
                      <Link to={`/product/${Product_Name}`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={
                              i.images && i.images
                                ? `${backend_url}public/product/${i.images[0]}`
                                : "path/to/fallback-image.jpg"
                            }
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          {seller && seller ? (
            <div className={`${styles.button}`}>
              <Link to="/dashboard">
                <h1 className="text-[#fff] flex items-center">
                  Go to dashboard
                  <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
          ) : (
            <div className={`${styles.button}`}>
              <Link to="/shop-create">
                <h1 className="text-[#fff] flex items-center">
                  Become Seller
                  <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition  800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* navbar */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          {/* cart whislist profile */}

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            <div
              className={`${styles.noramlFlex}`}
              onClick={() => setOpenCart(true)}
            >
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {user && isAuthenticated ? (
                  role === "user" ? (
                    <Link to="/profile">
                      <img
                        src={`${backend_url}public/images/${user.avatar}`}
                        className="w-[35px] h-[35px] rounded-full"
                        alt="User Avatar"
                      />
                    </Link>
                  ) : role === "admin" ? (
                    <Link to="/admin-dashboard">
                      <img
                        src={`${backend_url}public/images/${user.avatar}`}
                        className="w-[35px] h-[35px] rounded-full"
                        alt="User Avatar"
                      />
                    </Link>
                  ) : (
                    <Link to="/login">
                      <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                    </Link>
                  )
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/*------------------ Cart popup---------------  */}
            {user && openCart && <Cart setOpenCart={setOpenCart} />}

            {/*------------------ Wishlist popup ---------------*/}
            {user && openWishlist && (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
