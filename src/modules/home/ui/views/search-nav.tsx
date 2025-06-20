import { Searchbutton } from "@/modules/layouts/search/Searchbutton";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex items-center">
      <input
        onClick={() => {
          setOpen(true);
        }}
        className="w-26 lg:w-40 hidden sm:block bg-white/10 dark:bg-white/5 backdrop-blur-sm text-white pl-1 py-1 text-sm font-medium rounded-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 hover:border-white/30 dark:hover:border-white/20 transition-all duration-300 ease-in-out focus:outline-none shadow-lg hover:shadow-xl cursor-pointer"
        type="text"
        placeholder="Search"
      />
      <div className="hidden sm:block absolute right-2">
        <Searchbutton open={open} setOpen={setOpen} />
      </div>
      <div className="sm:hidden absolute right-2 p-[10px] cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out bg-white/10 dark:bg-white/5 backdrop-blur-sm text-white text-sm font-medium rounded-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 hover:border-white/30 dark:hover:border-white/20 focus:outline-none shadow-lg hover:shadow-xl">
        <FaSearch
          onClick={() => {
            setOpen(true);
          }}
          className="text-white"
        />
      </div>
    </div>
  );
}

export default SearchNav;
