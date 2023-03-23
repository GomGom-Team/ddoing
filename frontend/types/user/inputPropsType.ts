import { ChangeEvent } from "react";
export type InputProps = {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
