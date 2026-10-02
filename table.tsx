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
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={String(column.accessor)}>
              {column.header}
            </th>
          ))}

          {renderActions && <th>Actions</th>}
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + (renderActions ? 1 : 0)}>
              {emptyMessage}
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map((column) => (
                <td key={String(column.accessor)}>
                  {column.render
                    ? column.render(row[column.accessor], row)
                    : String(row[column.accessor])}
                </td>
              ))}

              {renderActions && (
                <td>{renderActions(row)}</td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}