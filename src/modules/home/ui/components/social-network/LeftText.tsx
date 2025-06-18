import HomeButton from "@/components/HomeButton"


function LeftText() {
  return (
    <div className="flex-1 flex flex-col justify-center items-start max-w-none lg:max-w-lg">
    <span className="text-blue-700 font-semibold text-lg mb-2">
      What We Do
    </span>
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 leading-tight">
      Why Join Our Cirkle from Social Network ?
    </h2>
    <p className="text-gray-400 text-lg mb-8">
      Social hen an unknown printer took a galley of type and scrambled make
      type specimen book. It has survived not only five centuries but also
      the leap into electronic typesetting of the remaining essential
      unchanged they popularised with release.
    </p>
    <HomeButton>Join Our Community</HomeButton>
  </div>
  )
}

export default LeftText