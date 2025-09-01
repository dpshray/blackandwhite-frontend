'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface TextInputProps<TFieldValues extends FieldValues> {
  label?: string;
  name: Path<TFieldValues>;
  placeholder?: string;
  error?: FieldError;
  type?: "text" | "email" | "password" | "number" | "textArea";
  label_size?: string
  showToggle?: boolean;
  icon?: React.ReactNode;
  register: UseFormRegister<TFieldValues>;
}

export default function TextInput<TFieldValues extends FieldValues>({
  label,
  name,
  placeholder,
  error,
  type = "text",
  label_size,
  icon,
  register,
  showToggle = false,
}: TextInputProps<TFieldValues>) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={String(name)} className={label_size}>{label}</Label>}
      <div className="relative">
        {type === "textArea" ? (
          <Textarea
            id={String(name)}
            placeholder={placeholder}
            {...register(name)}
          />
        ) : (
          <Input
            id={String(name)}
            type={inputType}
            placeholder={placeholder}
            {...register(name)}
            className={`${icon ? "peer ps-9" : ""} ${
              showToggle ? "pe-10" : ""
            }`}
          />
        )}

        {icon && type !== "textArea" && (
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80">
            {icon}
          </div>
        )}

        {showToggle && type === "password" && (
          <Button
            variant="ghost"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="hover:!bg-transparent absolute inset-y-0 end-0 flex w-9 items-center justify-center text-muted-foreground/80 hover:text-foreground focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
          </Button>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
