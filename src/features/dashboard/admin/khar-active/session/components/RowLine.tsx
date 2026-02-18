function formatValue(v: any) {
  if (v === null || v === undefined) return "—";

  // primitive
  if (
    typeof v === "string" ||
    typeof v === "number" ||
    typeof v === "boolean"
  ) {
    return String(v);
  }

  // Array
  if (Array.isArray(v)) {
    return (
      v
        .map((x) => {
          if (!x) return "";
          if (typeof x === "string" || typeof x === "number") return x;
          if (typeof x === "object")
            return x.title || x.name || x.full_name || x.id || "";
          return "";
        })
        .filter(Boolean)
        .join(", ") || "—"
    );
  }

  // Object
  if (typeof v === "object") {
    return (
      v.title ||
      v.name ||
      v.full_name ||
      v.address ||
      v.email ||
      v.id ||
      JSON.stringify(v)
    );
  }

  return String(v);
}

function RowLine({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-gray-200 last:border-b-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-medium text-right wrap-break-word max-w-[60%] text-gray-900">
        {formatValue(value)}
      </span>
    </div>
  );
}
export default RowLine;