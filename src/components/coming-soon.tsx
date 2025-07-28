import { cn } from "@/lib/utils";
import { ArrowLeftIcon, RocketIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";

interface ComingSoonProps {
  title: string;
  subtitle: string;
  className?: string;
  link?: string;
  linkText?: string;
}

export const ComingSoon = ({
  title,
  subtitle,
  className,
  link,
  linkText,
}: ComingSoonProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center h-screen gap-4",
        className
      )}
    >
      <RocketIcon className="w-10 h-10 text-blue-500" />
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-lg text-gray-500">{subtitle}</p>
      <Button asChild>
        <Link to={link || "/"}>
          <ArrowLeftIcon className="w-4 h-4" />
          {linkText || "Go Home"}
        </Link>
      </Button>
    </div>
  );
};
