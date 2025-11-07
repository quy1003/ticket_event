import Link from 'next/link'

type Props = {
  entity: string
  data: Array<Record<string, any>>
}

// Server component: simple, generic table renderer for server-provided records.
export default function ServerTable({ entity, data }: Props) {
  const rows = data || []
  // Derive columns automatically from the first row's keys
  const cols = rows.length > 0 ? Object.keys(rows[0]) : []

  return (
    <div className="bg-white shadow-sm rounded-md overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="text-lg font-semibold">
          {entity.charAt(0).toUpperCase() + entity.slice(1)}
        </h3>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/${entity}/new`}
            className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            Create
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {cols.map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, idx) => (
              <tr key={row.id ?? idx} className="hover:bg-gray-50">
                {cols.map((col) => (
                  <td
                    key={String(col)}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                  >
                    {renderCell(row[col])}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/admin/${entity}/${row.id}`}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={cols.length + 1}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function renderCell(value: any) {
  if (value === null || value === undefined) return <span className="text-gray-400">—</span>
  if (typeof value === 'object') {
    // Simple handling for relations or nested objects: show id or JSON
    if ('id' in value) return String((value as any).id)
    try {
      return JSON.stringify(value)
    } catch {
      return String(value)
    }
  }
  return String(value)
}
