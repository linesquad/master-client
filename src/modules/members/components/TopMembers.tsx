function TopMembers() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold dark:text-white mb-4">Members</h2>
      <div className="flex space-x-2 border-b dark:border-gray-700 pb-2 mb-4">
        <button className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
          Active
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex items-center">
          <img
            src="https://i.pravatar.cc/40?u=1"
            alt="avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold dark:text-white">Rebeca Powel</p>
            <p className="text-sm text-gray-400">a month ago</p>
          </div>
        </div>
        <div className="flex items-center">
          <img
            src="https://i.pravatar.cc/40?u=2"
            alt="avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold dark:text-white">John Caius</p>
            <p className="text-sm text-gray-400">3 years ago</p>
          </div>
        </div>
        <div className="flex items-center">
          <img
            src="https://i.pravatar.cc/40?u=3"
            alt="avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold dark:text-white">Wynonna Judd</p>
            <p className="text-sm text-gray-400">3 years ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopMembers;
