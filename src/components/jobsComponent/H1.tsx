import { cn } from "@/lib/utils";
import React from "react";

const H1 = (props: React.HTMLProps<HTMLHeadingElement>) => {
  return (
    <h1
      className={cn(
        "text-4xl font-extrabold tracking-tight lg:text-5xl",
        props.className,
      )}
      {...props}
    />
  );
};

export default H1;
