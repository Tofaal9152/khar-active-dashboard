function RowEdit({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-4">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-semibold text-right break-words">
        {value}
      </span>
    </div>
  );
}
export default RowEdit;