import {
  useMutation,
  useQuery,
  useQueryClient,
  useIsFetching,
} from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import EmployeeTable from "./EmployeeTable";
import { deleteEmployee, fetchEmployees } from "@/api";

function ListForm() {
  const queryClient = useQueryClient();
  const isFetching = useIsFetching();

  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: () => fetchEmployees(),
  });

  const { mutateAsync: deleteEmployeeMutation } = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      updateTable();
    },
  });

  function updateTable() {
    queryClient.invalidateQueries({ queryKey: ["employees"] });
  }

  return (
    <div>
      <div className="flex mb-3 justify-center">
        <Button>
          <Link to={`Add`}>Add New Employee</Link>
        </Button>
      </div>

      {isLoading ? (
        <p>Loading ... </p>
      ) : (
        <div>
          {isFetching > 0 && (
            <div className="bg-slate-600 flex justify-center">
              <p className="text-white">Updating...</p>
            </div>
          )}
          <EmployeeTable
            employees={employees}
            updateTable={updateTable}
            deleteEmpMutation={deleteEmployeeMutation}
          />
        </div>
      )}
    </div>
  );
}

export default ListForm;
