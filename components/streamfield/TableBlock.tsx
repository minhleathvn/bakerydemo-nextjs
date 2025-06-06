import type { recipeBlocks } from '@/models/blocks/recipes';

export default function TableBlock({
  block: { value },
}: {
  block: recipeBlocks.Table;
}) {
  const { first_row_is_table_header, data } = value;

  return (
    <div className="my-8 overflow-x-auto rounded-lg shadow-md">
      <table className="w-full bg-white border border-brown-200">
        {first_row_is_table_header && (
          <thead className="bg-bakery-100">
            <tr>
              {data[0].map((cell, i) => (
                <th key={i} className="px-4 py-3 text-left font-semibold text-brown-900 border-b border-brown-200">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {data.slice(first_row_is_table_header ? 1 : 0).map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-brown-50'}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-brown-700 border-b border-brown-100">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
