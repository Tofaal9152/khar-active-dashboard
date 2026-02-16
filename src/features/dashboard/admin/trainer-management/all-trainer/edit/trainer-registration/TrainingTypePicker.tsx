import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

type Props = {
  value: string[];
  onChange: (val: string[]) => void;
  options: string[];
  placeholder?: string;
};

function TrainingTypePicker({
  value,
  onChange,
  options,
  placeholder = "Type to add new training type...",
}: Props) {
  const [input, setInput] = useState("");

  // preset + user-added unique list
  const allChips = useMemo(() => {
    const map = new Map<string, string>();

    for (const o of options) {
      map.set(o.toLowerCase(), o);
    }

    for (const v of value) {
      const key = v.toLowerCase();
      if (!map.has(key)) map.set(key, v);
    }

    return Array.from(map.values());
  }, [options, value]);

  const isSelected = (t: string) =>
    value.some((v) => v.toLowerCase() === t.toLowerCase());

  const toggle = (t: string) => {
    if (isSelected(t)) {
      onChange(value.filter((v) => v.toLowerCase() !== t.toLowerCase()));
    } else {
      onChange([...value, t]);
    }
  };

  const addNew = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    if (!isSelected(trimmed)) {
      onChange([...value, trimmed]);
    }

    setInput("");
  };

  return (
    <div className="space-y-3">
      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {allChips.map((t) => {
          const selected = isSelected(t);

          return (
            <button
              type="button"
              key={t}
              onClick={() => toggle(t)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all inline-flex items-center gap-2
                ${
                  selected
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
            >
              {selected && <Check className="w-4 h-4" />}
              <span>{t}</span>

              {/* remove icon only for custom selected */}
              {selected &&
                !options.some((o) => o.toLowerCase() === t.toLowerCase()) && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(t);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </span>
                )}
            </button>
          );
        })}
      </div>

      {/* Add Input */}
      <div className="relative">
        <Input
          value={input}
          placeholder={placeholder}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addNew();
            }
          }}
        />

        {input.trim() && (
          <Button
            type="button"
            size="sm"
            variant="destructive"
            className="absolute right-1 top-1 h-7"
            onMouseDown={(e) => e.preventDefault()}
            onClick={addNew}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        )}
      </div>
    </div>
  );
}
export default TrainingTypePicker;
