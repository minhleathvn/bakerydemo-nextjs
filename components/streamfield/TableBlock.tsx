import type { recipeBlocks } from '@/models/blocks/recipes';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function TableBlock({
  block: { value },
}: {
  block: recipeBlocks.Table;
}) {
  const { first_row_is_table_header, data } = value;

  return (
    <div className="my-6">
      <Table>
        {first_row_is_table_header && (
          <TableHeader>
            <TableRow>
              {data[0].map((cell, i) => (
                <TableHead key={i}>{cell}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {data.slice(first_row_is_table_header ? 1 : 0).map((row, i) => (
            <TableRow key={i}>
              {row.map((cell, j) => (
                <TableCell key={j}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
