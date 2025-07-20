function MainWrapper({ children }: { children: React.ReactNode }) {
  return <div className="max-w-[1440px] mx-auto">{children}</div>;
}

export default MainWrapper;
