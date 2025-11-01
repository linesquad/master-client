import { Link } from "@tanstack/react-router";
import { Community, Followers, Important } from "@/lib/footer";
import MainWrapper from "@/components/ui/MainWrapper";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-border w-full border-t px-2 sm:px-6 lg:px-8 transition-colors duration-300">
      <MainWrapper>
        <div className=" py-12 bg-background border-border w-full flex flex-col items-center justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <img src="/favicon.png" alt="Logo" className="w-30" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                {t("footer.description")}
              </p>
            </div>

            <div className="">
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("footer.importantLinks.heading")}
              </h3>
              <div className="w-8 h-1 bg-primary mb-4" />
              <ul className="space-y-2">
                {Important(t).map((item) => (
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
                {t("footer.community.heading")}
              </h3>
              <div className="w-8 h-1 bg-primary mb-4" />
              <ul className="space-y-2">
                {Community(t).map((item) => (
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
                {t("footer.followers.heading")}
              </h3>
              <div className="w-8 h-1 bg-primary mb-4" />
              <ul className="space-y-2">
                {Followers(t).map((item) => (
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
