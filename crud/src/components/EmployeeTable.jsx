import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import EditModal from "./EditModal";
import DeleteConfirm from "./DeleteConfirm";

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: (props) => <Checkbox checked={props.getValue()} />,
  },
  {
    accessorKey: "department",
    header: "Dept",
    cell: (props) => <p>{props.getValue()}</p>,
  },
];

function EmployeeTable({ employees: data, updateTable , deleteEmpMutation}) {
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editEmployeeObj, setEditEmployeeObj] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  async function deleteEmp(){
    await deleteEmpMutation(editEmployeeObj.id);
  }
  return (
    <>
      <div>
        <table className="min-w-full divide-y divide-gray-400 table-fixed">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th></th>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-3 px-6 text-sm tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
                <th></th>
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-300">
                <td className="px-4 text-sm">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => {
                      setOpenDialog(!openDialog);
                      setEditEmployeeObj(row.original);
                    }}
                  >
                    <DeleteIcon color="success" />
                  </Button>
                </td>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-4 px-4 text-sm font-medium text-gray-900 whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                  <Button
                    variant="link"
                    size="xl"
                    onClick={() => {
                      setEditEmployeeObj(row.original);
                      setOpenModal(!openModal);
                    }}
                  >
                    <a
                      href="#"
                      className="text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </Button>
                </td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-around mt-3">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {" "}
          {"<< Prev"}
        </Button>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {"Next >>"}
        </Button>
      </div>
      <EditModal
        openModal={openModal}
        onOpenChange={setOpenModal}
        onUpdateSuccess={updateTable}
        data={editEmployeeObj}
      />
      <DeleteConfirm openDialog={openDialog} onOpenChange={setOpenDialog} confimDelete={deleteEmp}/>
    </>
  );
}

export default EmployeeTable;
