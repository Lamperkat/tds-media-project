import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { getUsers } from "../../services/getUsers";
import { User } from "../../types/User";
import { formatDate } from "../../utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import getUsersByQuery from "../../services/getUsersByQuery";
import { useUserStore } from "../../store/userStore";

function Table() {
  const { query } = useUserStore();
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Имя",
    },
    {
      accessorKey: "surname",
      header: () => <span>Фамилия</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorFn: (row) => row?.skills?.join(", ") || null,
      id: "skills",
      header: "Навыки",
    },
    {
      accessorFn: (row) => formatDate(row.registrationDate),
      id: "registrationDate",
      header: "Дата регистрации",
    },
  ];

  const { data: usersData = [] } = useQuery({
    queryKey: ["user"],
    queryFn: getUsers,
  });

  const { data: queryData = [] } = useQuery({
    queryKey: ["user", query],
    queryFn: () => getUsersByQuery(query),
    enabled: !!query,
  });

  const data = query ? queryData : usersData;
  const tableInstance = useReactTable({
    manualPagination: true,
    columns,
    data,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <table style={{ overflowY: "scroll" }}>
      <thead>
        {tableInstance.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {tableInstance.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {tableInstance.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
}

export default Table;
