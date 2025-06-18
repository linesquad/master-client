import HomeButton from "@/components/HomeButton";

function LeftTexts() {
  return (
    <div className="flex-1 max-w-xl text-center md:text-left">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
        Fully Responsive Cirkle
        <br />
        WordPress Theme
      </h1>
      <p className="text-gray-500 mb-8 text-base md:text-lg">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed does the
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation.
      </p>
      <HomeButton>Purchase Now</HomeButton>     
    </div>
  );
}

export default LeftTexts;
