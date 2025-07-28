export const Important = (t: (key: string) => string) => [
  {
    name: t("footer.importantLinks.about"),
    to: "/about",
  },
  {
    name: t("footer.importantLinks.home"),
    to: "/",
  },
  {
    name: t("footer.importantLinks.contact"),
    to: "/contact",
  },
  {
    name: t("footer.importantLinks.blog"),
    to: "/blog",
  },
];

export const Community = (t: (key: string) => string) => [
  {
    name: t("footer.community.find"),
    to: "/find",
  },
  {
    name: t("footer.community.blog"),
    to: "/blog",
  },
  {
    name: t("footer.community.notifications"),
    to: "/notifications",
  },
  {
    name: t("footer.community.profile"),
    to: "/profile",
  },
];

export const Followers = (t: (key: string) => string) => [
  {
    name: t("footer.followers.facebook"),
    to: "/facebook",
  },
  {
    name: t("footer.followers.twitter"),
    to: "/twitter",
  },
  {
    name: t("footer.followers.instagram"),
    to: "/instagram",
  },
  {
    name: t("footer.followers.linkedin"),
    to: "/linkedin",
  },
];
