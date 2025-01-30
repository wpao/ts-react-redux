import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AdminPage = (props: React.PropsWithChildren<{}>) => {
  // mendapatkan data dari redux
  // redux mendapatkan data dari localStorage
  const userSelector = useSelector((state: RootState) => state.user);

  // jika id ada berarti sudah login
  if (userSelector.role !== "admin") {
    // kemudian akan di arahkan ke halaman home
    return <Navigate to="/" />;
  }

  // jika tidak ada maka akan di arahkan ke halaman login
  // karna props.children berisi pages yang di filter
  return props.children;
};
