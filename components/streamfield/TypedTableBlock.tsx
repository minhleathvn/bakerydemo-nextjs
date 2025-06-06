import Image from 'next/image';
import type { recipeBlocks } from '@/models/blocks/recipes';

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
        return <div className="text-brown-700" dangerouslySetInnerHTML={{ __html: cell }} />;
      case 'number':
        return <span className="font-medium text-brown-800">{cell.toString()}</span>;
      case 'object':
        if ('id' in cell) {
          return (
            <div className="flex justify-center">
              <Image
                src={cell.meta.download_url}
                alt={cell.title}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
            </div>
          );
        }
        return <pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify(cell, null, 2)}</pre>;
    }
  };

  return (
    <figure className="my-8">
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full bg-white border border-brown-200">
          <thead className="bg-bakery-100">
            <tr>
              {columns.map((column, i) => (
                <th key={i} className="px-4 py-3 text-left font-semibold text-brown-900 border-b border-brown-200">
                  {column.heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-brown-50'}>
                {row.values.map((cell, j) => (
                  <td key={j} className="px-4 py-3 border-b border-brown-100">
                    {renderCell(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-brown-600 text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
