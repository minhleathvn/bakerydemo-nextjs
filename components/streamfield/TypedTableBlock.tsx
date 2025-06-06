import Image from 'next/image';
import type { recipeBlocks } from '@/models/blocks/recipes';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function TypedTableBlock({
  block: { value },
}: {
  block: recipeBlocks.TypedTable;
}) {
  const { caption, columns, rows } = value;

  const renderCell = (
    cell: recipeBlocks.TypedTable['value']['rows'][number]['values'][number],
  ) => {
    switch (typeof cell) {
      case 'string':
        return <div dangerouslySetInnerHTML={{ __html: cell }} />;
      case 'number':
        return cell.toString();
      case 'object':
        if ('id' in cell) {
          return (
            <div className="flex justify-center">
              <Image
                src={cell.meta.download_url}
                alt={cell.title}
                width={100}
                height={100}
                className="rounded object-cover"
              />
            </div>
          );
        }
        return <pre className="text-xs bg-muted p-2 rounded">{JSON.stringify(cell, null, 2)}</pre>;
    }
  };

  return (
    <figure className="my-6">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, i) => (
                <TableHead key={i}>{column.heading}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                {row.values.map((cell, j) => (
                  <TableCell key={j}>{renderCell(cell)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-center text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
