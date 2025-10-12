import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id: string;
  label: string;
  placeholder?: string;
  value?: string;
  options: Option[];
  onValueChange: (value: string) => void;
}

export function CustomSelect({
  id,
  label,
  placeholder = 'Select option',
  value,
  options,
  onValueChange,
}: CustomSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          id={id}
          className="w-full bg-card border-border text-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="text-foreground"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
