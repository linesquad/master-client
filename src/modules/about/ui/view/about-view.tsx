import { useTranslation } from "react-i18next";
import { useState } from "react";

const youtubeVideos = [
  "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "https://www.youtube.com/embed/9bZkp7q19f0",
  "https://www.youtube.com/embed/JGwWNGJdvx8",
  "https://www.youtube.com/embed/kJQP7kiw5Fk",
  "https://www.youtube.com/embed/VBlFHuCzPgY",
];

export const AboutView = () => {
  const { t } = useTranslation("common");
  const [showVideo, setShowVideo] = useState(false);
  const [randomVideo, setRandomVideo] = useState("");

  const handlePlayClick = () => {
    const randomIndex = Math.floor(Math.random() * youtubeVideos.length);
    setRandomVideo(youtubeVideos[randomIndex]);
    setShowVideo(true);
  };

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto py-20 px-4 gap-12">
      {/* Left Side: Text Content */}
      <div className="flex-1 sm:max-w-xl min-w-0">
        <div className="text-blue-700 font-semibold mb-2 text-lg">
          {t("about.aboutView.whoAreWe")}
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {t("about.aboutView.title")}
        </h2>
        <p className="text-gray-600 mb-4">
          {t("about.aboutView.description1")}
        </p>
        <p className="text-gray-600 mb-8">
          {t("about.aboutView.description2")}
        </p>
        <div className="flex flex-wrap gap-6 sm:gap-12 mt-8 w-full">
          <div className="flex items-center gap-3">
            <svg
              className="w-8 h-8 text-blue-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05C17.16 14.1 19 15.03 19 16.5V19h5v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
            <div>
              <div className="text-2xl font-bold">1500K+</div>
              <div className="text-gray-500 text-sm">
                {t("about.aboutView.registeredMembers")}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <svg
              className="w-8 h-8 text-blue-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 8h14v-2H7v2zm0-4h14v-2H7v2zm0-6v2h14V7H7z" />
            </svg>
            <div>
              <div className="text-2xl font-bold">121+</div>
              <div className="text-gray-500 text-sm">
                {t("about.aboutView.featuresAvailable")}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Right Side: Video Content */}
      <div className="flex-1 flex items-center justify-center relative min-w-[300px] min-h-[340px]">
        {showVideo ? (
          <iframe
            src={randomVideo}
            className="w-full h-96 rounded-lg shadow-xl"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
              alt="Group"
              className="rounded-lg shadow-lg w-80 h-80 object-cover absolute top-0 right-0 z-0"
            />
            <div className="absolute left-0 bottom-0 z-10">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=300&q=80"
                  alt="Video preview"
                  className="rounded-lg shadow-xl w-64 h-48 object-cover"
                />
                <button
                  className="absolute inset-0 flex items-center justify-center"
                  onClick={handlePlayClick}
                >
                  <span className="bg-white bg-opacity-80 rounded-full p-3 shadow-lg">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
