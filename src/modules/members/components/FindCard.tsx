
function FindCard() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
    <div className="flex items-center mb-4">
      <img
        src="https://i.pravatar.cc/48?u=1"
        alt="avatar"
        className="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <p className="font-semibold dark:text-white">
          Rebeca Powel <span className="text-blue-500">✔</span>{" "}
          posted an update
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          4 Years Ago
        </p>
      </div>
    </div>

    <p className="text-gray-700 dark:text-gray-300 mb-4">
      Sed ut perspiciatis unde omnis natus error sit voluptatem
      accusantium der doloremque laudantium Sed ut perspicia tisery.
      I'll be uploading new content every day, improving the quality.
    </p>
  </div>
  )
}

export default FindCard