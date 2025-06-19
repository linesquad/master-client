import { Link } from "@tanstack/react-router";
import { Community, Followers, Important } from "@/lib/footer";
import MainWrapper from "@/components/ui/MainWrapper";

function Footer() {
  return (
    <footer className="bg-background border-border w-full border-t px-2 sm:px-6 lg:px-8 transition-colors duration-300">
      <MainWrapper>
        <div className=" py-12 bg-background border-border w-full flex flex-col items-center justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <rect
                    x="4"
                    y="4"
                    width="48"
                    height="48"
                    rx="12"
                    stroke="#3B5BFE"
                    strokeWidth="4"
                  />
                  <path
                    d="M16 28L28 16L40 28"
                    stroke="#3B5BFE"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 36H40"
                    stroke="#3B5BFE"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-2xl font-semibold text-foreground">
                  irkle
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                Dorem ipsum dolor sit amet consec adipisicing elit sed do
                eiusmod por incididunt labore et loreLorem ipsum kelly amieo
                dolorey.
              </p>
            </div>

            <div className="">
              <h3 className="text-lg font-bold text-foreground mb-2">
                Important Links
              </h3>
              <div className="w-8 h-1 bg-primary mb-4" />
              <ul className="space-y-2">
                {Important.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="">
              <h3 className="text-lg font-bold text-foreground mb-2">
                Community
              </h3>
              <div className="w-8 h-1 bg-primary mb-4" />
              <ul className="space-y-2">
                {Community.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="">
              <h3 className="text-lg font-bold text-foreground mb-2">
                Followers
              </h3>
              <div className="w-8 h-1 bg-primary mb-4" />
              <ul className="space-y-2">
                {Followers.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-6 text-center w-full">
            <p className="text-sm text-muted-foreground">
              Copyright © 2025 Linedev.
            </p>
          </div>
        </div>
      </MainWrapper>
    </footer>
  );
}

export default Footer;
