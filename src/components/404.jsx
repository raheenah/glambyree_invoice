import { NavLink, useLocation } from "react-router-dom";

const notFound = () => {

  // const isActive = (path) => location.pathname === path;

  return (
    <div className='bg-background items-center flex-col flex justify-center fixed w-full h-screen py-2 z-50 px-8 mx-auto'>
      <h1 className='font-[1000] text-9xl font-tangerine'>404 </h1>
      <div className='flex gap-8'>
        <NavLink
          to={"/list"}
          className='btn-primary  mx-auto font-bold  shadow-[0_5px_10px_rgba(0,0,0,0.15),0_-5px_10px_rgba(255,255,255,0.2)] hover:bg-background-secondary   w-fit px-2 border-b-2 border-b-button  rounded-lg py-1'
        >
          Return to List
        </NavLink>
        <NavLink
          to={"/add"}
          className='btn-primary  mx-auto font-bold  shadow-[0_5px_10px_rgba(0,0,0,0.15),0_-5px_10px_rgba(255,255,255,0.2)] hover:bg-background-secondary   w-fit px-2 border-b-2 border-b-button  rounded-lg py-1'
        >
          Create invoice
        </NavLink>
      </div>
    </div>
  );
};

export default notFound;
