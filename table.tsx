
import type { ReactNode } from "react";

type TableColumn<T> = {
  [K in keyof T]: {
    header: string;
    accessor: K;
    render?: (value: T[K], row: T) => ReactNode;
  };
}[keyof T];

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  renderActions?: (row: T) => ReactNode;
  getRowKey: (row: T) => string | number;
  emptyMessage?: string;
}

export function Table<T>({
  data,
  columns,
  renderActions,
  getRowKey,
  emptyMessage = "No data available",
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[600px] border-collapse text-left text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.accessor)}
                scope="col"
                className="whitespace-nowrap px-5 py-4 font-semibold text-slate-700"
              >
                {column.header}
              </th>
            ))}

            {renderActions && (
              <th
                scope="col"
                className="whitespace-nowrap px-5 py-4 font-semibold text-slate-700"
              >
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (renderActions ? 1 : 0)}
                className="px-5 py-10 text-center text-slate-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={getRowKey(row)}
                className="transition-colors hover:bg-slate-50"
              >
                {columns.map((column) => (
                  <td
                    key={String(column.accessor)}
                    className="whitespace-nowrap px-5 py-4 text-slate-600"
                  >
                    {column.render
                      ? column.render(row[column.accessor], row)
                      : String(row[column.accessor])}
                  </td>
                ))}

                {renderActions && (
                  <td className="px-5 py-4">
                    {renderActions(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
