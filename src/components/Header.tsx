import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoCart, IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="flex justify-between p-4">
      <Link to="/">
        <h1 className="text-3xl font-bold">ts-react-redux-course</h1>
      </Link>

      {/* search */}
      <Input placeholder="Search..." className="w-1/3" />

      <div className="flex space-x-2">
        <Button variant="ghost" size={"icon"}>
          <IoCart className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size={"icon"}>
          <IoHeart className="w-6 h-6" />
        </Button>

        <Link to={"/login"}>
          <Button>Log in</Button>
        </Link>
        <Button variant="outline">Sig up</Button>
      </div>
    </header>
  );
};
