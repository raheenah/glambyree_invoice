import { NavLink, useLocation } from "react-router-dom";

const notFound = () => {
  const location = useLocation();

  // const isActive = (path) => location.pathname === path;

  return (
    <div className='bg-background fixed w-full py-2 z-50 px-8 mx-auto'>
      404 page
      <NavLink to={"/list"}>go to list</NavLink>
    </div>
  );
};

export default notFound;
