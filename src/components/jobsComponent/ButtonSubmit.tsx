'use client'

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const ButtonSubmit = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { pending } = useFormStatus();

  return (
    <Button {...props} type="submit" disabled={ props.disabled || pending}>
        <span className="flex items-center justify-center gap-1">
            {pending && <Loader2 className="w-4 h-4 animate-spin" />}
            { props.children }
        </span>
    </Button>
  )
}

export default ButtonSubmit