import { ReactNode } from "react";
import { Nav } from "../../components/nav";

const Layout = ({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) => {
  return (
    <>
      <Nav subpage={"Hacker News"} subpageHref="/hn" />
      <div className="container bg-gray-2 py-2 ">{children}</div>

      {modal}
    </>
  );
};
export default Layout;
