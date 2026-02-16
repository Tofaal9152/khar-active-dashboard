import { TableCell, TableRow } from "@/components/ui/table";

const EmptyTable = ({ columns }: { columns: any[] }) => {
  return (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        No results.
      </TableCell>
    </TableRow>
  );
};

export default EmptyTable;
