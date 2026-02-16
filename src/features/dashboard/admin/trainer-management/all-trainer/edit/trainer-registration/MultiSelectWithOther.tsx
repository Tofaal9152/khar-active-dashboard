import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useState } from "react";

function MultiSelectWithOther({
  value,
  onChange,
  options,
  placeholder,
  icon: Icon,
}: {
  value: string[];
  onChange: (val: string[]) => void;
  options: string[];
  placeholder: string;
  icon?: any;
}) {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const addTag = (val: string) => {
    const trimmed = val.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue("");
  };

  const removeTag = (val: string) => {
    onChange(value.filter((v) => v !== val));
  };

  // Filter options that are not yet selected
  const availableOptions = options.filter(
    (opt) =>
      !value.includes(opt) &&
      opt.toLowerCase().includes(inputValue.toLowerCase()),
  );

  return (
    <div className="space-y-3 relative">
      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((t) => (
          <Badge
            key={t}
            variant="secondary"
            className="px-3 py-1 text-sm flex items-center gap-1"
          >
            <span>{t}</span>
            <span onClick={() => removeTag(t)}>
              <X className="h-4 w-4 cursor-pointer text-red-500" />
            </span>
          </Badge>
        ))}
      </div>

      {/* Input Field */}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        )}
        <Input
          placeholder={placeholder}
          value={inputValue}
          className={Icon ? "pl-9" : ""}
          onFocus={() => setIsFocused(true)}
          // Delay blur to allow clicking on dropdown items
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag(inputValue);
            }
          }}
        />
        {/* Add Button for "Other" */}
        {inputValue && (
          <Button
            size="sm"
            variant="destructive"
            className="absolute right-1 top-1 h-7"
            onClick={() => addTag(inputValue)}
          >
            <Plus className="h-3 w-3" />
            Add
          </Button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isFocused && availableOptions.length > 0 && (
        <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto mt-1">
          {availableOptions.map((opt) => (
            <div
              key={opt}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between text-sm"
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent input blur
                addTag(opt);
              }}
            >
              <span>{opt}</span>
              <Plus className="h-3 w-3 text-gray-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MultiSelectWithOther;
