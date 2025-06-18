function MainWrapper({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`${className} max-w-[1440px] mx-auto`}>
      {children}
    </div>
  )
}

export default MainWrapper