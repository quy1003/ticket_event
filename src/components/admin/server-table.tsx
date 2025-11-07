import Link from 'next/link'
import SortableHeader from '../ui/sortable-header'
import { generatePaginationLinks } from '../../lib/utils'

type ServerTableProps = {
  entity: string
  data: {
    data: Array<Record<string, any>>
    meta?: {
      page?: number
      limit?: number
      totalItems?: number
      totalPages?: number
    }
  }
}

export default function ServerTable({ entity, data }: ServerTableProps) {
  const rows = data.data || []
  const meta = data.meta
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
                <SortableHeader key={col} column={col} />
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
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

      {/* Pagination */}
      {meta && meta.totalPages && meta.totalPages > 1 && (
        <div className="px-4 py-3 border-t bg-white flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing page <span className="font-medium">{meta.page}</span> of{' '}
            <span className="font-medium">{meta.totalPages}</span>
            {typeof meta.totalItems === 'number' && (
              <span className="ml-2">· {meta.totalItems} total</span>
            )}
          </div>

          <nav className="flex items-center space-x-1" aria-label="Pagination">
            {meta.page && meta.page > 1 ? (
              <Link
                href={`${`/admin/${entity}`}?page=${meta.page - 1}&limit=${meta.limit || ''}`}
                className="px-3 py-1 rounded-md border bg-white text-sm hover:bg-gray-50"
              >
                Previous
              </Link>
            ) : (
              <button className="px-3 py-1 rounded-md border bg-gray-100 text-sm text-gray-400 cursor-not-allowed">
                Previous
              </button>
            )}

            {renderPageLinks(
              meta.page || 1,
              meta.totalPages || 1,
              (p) => `${`/admin/${entity}`}?page=${p}&limit=${meta.limit || ''}`
            )}

            {meta.page && meta.page < (meta.totalPages || 1) ? (
              <Link
                href={`${`/admin/${entity}`}?page=${(meta.page || 1) + 1}&limit=${meta.limit || ''}`}
                className="px-3 py-1 rounded-md border bg-white text-sm hover:bg-gray-50"
              >
                Next
              </Link>
            ) : (
              <button className="px-3 py-1 rounded-md border bg-gray-100 text-sm text-gray-400 cursor-not-allowed">
                Next
              </button>
            )}
          </nav>
        </div>
      )}
    </div>
  )
}

function renderCell(value: any) {
  if (value === null || value === undefined) return <span className="text-gray-400">—</span>
  if (typeof value === 'object') {
    if ('id' in value) return String((value as any).id)
    try {
      return JSON.stringify(value)
    } catch {
      return String(value)
    }
  }
  return String(value)
}

function renderPageLinks(current: number, total: number, getHref: (p: number) => string) {
  const links = generatePaginationLinks(current, total)

  return links.map((p) => {
    if (p === current) {
      return (
        <span key={p} className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm">
          {p}
        </span>
      )
    }
    return (
      <Link
        key={p}
        href={getHref(p)}
        className="px-3 py-1 rounded-md border bg-white text-sm hover:bg-gray-50"
      >
        {p}
      </Link>
    )
  })
}
