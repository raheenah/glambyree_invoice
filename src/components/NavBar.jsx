import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className='bg-background fixed w-full py-2 z-50 px-8 mx-auto'>
      <ul className='flex py-2 gap-2  text-center lg:max-w-[80%] w-full mx-auto  items-center justify-center  shadow-custom-todo rounded-lg px-2'>
        <li>
          <NavLink
            to='/list'
            className={`text-text hover:text-button-hover hover:underline hover:font-bold font-semibold ${
              isActive("/") ? "text-button-hover underline" : "text-text"
            }`}
          >
            Inv List
          </NavLink>
        </li>

        <li className='text-text'>|</li>
        <li className='text-text hover:text-button-hover hover:underline hover:font-bold font-semibold'>
          <NavLink
            to='/add'
            className={`text-text hover:text-button-hover hover:underline hover:font-bold font-semibold ${
              isActive("/add")
                ? "text-button-hover underline"
                : "text-button-bg"
            }`}
          >
            Create
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
