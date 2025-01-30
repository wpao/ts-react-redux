import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoCart, IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

export const Header = () => {
  const userSelector = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  //
  const handleLogout = () => {
    // 1. hapus data user di localStorage
    localStorage.removeItem("current-user");

    // 2. hapus data user di redux
    dispatch({
      type: "USER_LOGOUT",
    });
  };
  return (
    <header className="flex justify-between p-4">
      <Link to="/">
        <h1 className="text-3xl font-bold">ts-react-redux-course</h1>
      </Link>

      {/* search */}
      <Input placeholder="Search..." className="w-1/3" />

      <div className="flex space-x-2 items-center">
        <Link to={"/admin/products/create"}>
          <Button>add product</Button>
        </Link>

        <Button variant="ghost" size={"icon"}>
          <IoCart className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size={"icon"}>
          <IoHeart className="w-6 h-6" />
        </Button>

        <Separator orientation="vertical" className="h-full" />
        {
          // jika user sudah login
          userSelector.id ? (
            <>
              <p>{userSelector.username}</p>
              <Button onClick={handleLogout} variant={"destructive"}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <Button>Log in</Button>
              </Link>
              <Link to={"/register"}>
                <Button variant="outline">Sig up</Button>
              </Link>
            </>
          )
        }
      </div>
    </header>
  );
};
