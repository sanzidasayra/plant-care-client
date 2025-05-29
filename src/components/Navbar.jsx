import { NavLink, Link, useNavigate } from "react-router-dom";
import img from "../assets/greenguardian.webp";
import { useContext } from "react";
import { AuthContext, fallbackAvatar } from "../context/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isLoggedIn");
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-green-600 font-semibold bg-green-200 px-2 py-1 rounded"
      : "text-gray-600 hover:text-green-600 px-2 py-1 rounded";

  return (
    <div className='navbar bg-base-100 shadow px-4 flex justify-between items-center h-16 lg:px-40'>
      <div className='dropdown lg:hidden'>
        <label tabIndex={0} className='btn btn-ghost btn-circle'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </label>

        <ul
          tabIndex={0}
          className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
        >
          {/* Nav links */}
          <li>
            <NavLink to='/' className={linkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/allPlants' className={linkClass}>
              All Plants
            </NavLink>
          </li>
          <li>
            <NavLink to='/addPlants' className={linkClass}>
              Add Plant
            </NavLink>
          </li>
          <li>
            <NavLink to='/myPlants' className={linkClass}>
              My Plants
            </NavLink>
          </li>

          <li className='divider'></li>

          {/* Auth controls */}
          {user ? (
            <>
              <li>
                <div className='flex items-center gap-2 px-2 py-1'>
                  <img
                    src={user.photo || fallbackAvatar}
                    alt={user.name || "Anonymous"}
                    className='w-8 h-8 rounded-full object-cover'
                  />
                  <span>{user.name || "Anonymous"}</span>
                </div>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className='w-full text-left px-2 py-1 text-red-600'
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/login' className='block px-2 py-1'>
                  Login
                </Link>
              </li>
              <li>
                <Link to='/register' className='block px-2 py-1'>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <Link to='/' className='flex items-center gap-2'>
        <img src={img} alt='Green Guardian Logo' className='h-6 w-6' />
        <span className='text-3xl font-bold text-green-700'>
          Green<span className='text-green-500'>Guardian</span>
        </span>
      </Link>

      <div className='hidden lg:flex w-full items-center'>
        <div className='flex-1 flex justify-center'>
          <ul className='menu menu-horizontal flex gap-4 font-medium'>
            <li>
              <NavLink to='/' className={linkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/allPlants' className={linkClass}>
                All Plants
              </NavLink>
            </li>
            <li>
              <NavLink to='/addPlants' className={linkClass}>
                Add Plant
              </NavLink>
            </li>
            <li>
              <NavLink to='/myPlants' className={linkClass}>
                My Plants
              </NavLink>
            </li>
          </ul>
        </div>

        <div className='flex items-center gap-4'>
          {user ? (
            <>
              <div className='relative group'>
                <div className='w-10 h-10 rounded-full overflow-hidden border-2 border-green-400'>
                  <img
                    src={user.photo || fallbackAvatar}
                    alt={user.name || "Anonymous"}
                    className='object-cover w-full h-full'
                  />
                </div>
                <div
                  className='absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1
                                rounded bg-black text-white text-sm opacity-0
                                group-hover:opacity-100 transition-opacity duration-300
                                whitespace-nowrap'
                >
                  {user.name || "Anonymous"}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className='btn bg-red-600 text-white px-4 py-2 rounded-xl shadow hover:bg-red-700'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to='/login'>
                <button
                  className='btn bg-green-200 text-green-700 px-4 py-2 rounded-xl font-bold
                                   hover:bg-green-700 hover:text-white transition'
                >
                  Login
                </button>
              </Link>
              <Link to='/register'>
                <button
                  className='btn bg-green-200 text-green-700 px-4 py-2 rounded-xl font-bold
                                   hover:bg-green-700 hover:text-white transition'
                >
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
