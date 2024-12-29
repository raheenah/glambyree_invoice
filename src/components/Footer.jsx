import { NavLink } from "react-router-dom";

const Footer = () => {
  const FooterData = [
    {
      id: "instagram",
      icon: "fa-brands fa-instagram",
      link: "https://www.instagram.com/raheena_h/",
      // icon: "<i className="fa- brands fa - instagram"></i>",
      username: "@Raheenah",
    },
    {
      id: "email",
      icon: "fa-regular fa-envelope",
      link: "mailto:raheenah500@gmail.com",
      // icon: "<i className="fa- brands fa - instagram"></i>",
      username: "Raheenah500@gmail.com",
    },
    {
      id: "linkedin",
      icon: "fa-brands fa-linkedin-in",
      link: "https://www.linkedin.com/in/mohammed-raheenat/",
      // icon: "<i className="fa- brands fa - instagram"></i>",
      username: "Raheenat Mohammed",
    },
    {
      id: "github",
      icon: "fa-brands fa-github",
      link: "https://www.github.com/raheenah",
      // icon: "<i className="fa- brands fa - instagram"></i>",
      username: "Raheenah",
    },
  ];

  return (
    <div className='bg-background pb-8 px-8'>
      {" "}
      <div className='py-4 flex flex-col gap-2 lg:max-w-[80%] w-full justify-center items-center mx-auto  shadow-custom-todo rounded-lg px-4'>
        <h3 className='text-text-primary font-bold text-lg'>
          Say Hi… or Stay Shy
        </h3>
        <div className='flex md:w-[60%] w-full justify-between items-end mt-6  '>
          <div className='flex flex-col gap-4'>
            <ul className='flex gap-4 '>
              {FooterData.map((item) => (
                <li key={item.id} className='flex'>
                  {/* <div className='bg-blue-300 flex items-center justify-center relative w-full h-full'> */}
                  <NavLink
                    to={item.link}
                    className='text-button-bg hover:text-button-hover text-lg '
                  >
                    <i className={item.icon}></i>
                  </NavLink>
                  {/* </div> */}
                </li>
              ))}
            </ul>{" "}
            <div className='flex gap-2 items-center text-text-primary'>
              {" "}
              <i className='fa-solid fa-location-dot primary'></i>
              <p>Abuja, Nigeria</p>
            </div>
          </div>
          <p className='text-sm text-text-primary font-light'>
            © Raheenah 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
