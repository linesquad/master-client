import { header } from "@/lib/header";
import { Link } from "@tanstack/react-router";
import { useUserId } from "../hooks/useUserId";
import { useLogout } from "../hooks/useLogout";

function Header() {
  const { data: user } = useUserId();
  const { mutate: logout } = useLogout();
  console.log(user);
  return (
    <header className="bg-red-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src="/vite.svg" alt="Logo" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {header.map((item) => (
                  <Link to={item.to} key={item.name}>
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="ml-10 flex items-baseline space-x-4">
                {user ? (
                  <button onClick={() => logout()}>Logout</button>
                ) : (
                  <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
