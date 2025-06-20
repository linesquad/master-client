import { Megaphone } from "lucide-react"


function FindBanner() {
  return (
    <div
    className="bg-yellow-500 rounded-lg p-6 flex justify-between items-center mb-8"
    style={{ backgroundImage: "url('/authbg.jpg')" }}
  >
    <div className="flex items-center">
      <div className="p-3 rounded-full mr-4">
        <Megaphone
          className="w-30 h-30 text-white"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-white">
          Members Newsfeed
        </h1>
        <p className="text-white">
          Check what your friends have been up to!
        </p>
      </div>
    </div>
    <div className="hidden lg:block">
      <img src="/peopleimage.png" alt="people" className="h-32" />
    </div>
  </div>
  )
}

export default FindBanner