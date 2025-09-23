import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";

const FormInput = ({
  icon,
  label,
  ...props
}: {
  icon: React.ReactNode;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <Label className="font-medium text-gray-600">{label}</Label>
    <div className="relative mt-1">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {icon}
      </div>
      <Input {...props} className="pl-10" />
    </div>
  </div>
);

export default FormInput
