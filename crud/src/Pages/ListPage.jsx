import ListForm from "@/components/ListForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function ListPage() {
  return (
    <div className="flex">
      <QueryClientProvider client={queryClient}>
        <ListForm/>
      </QueryClientProvider>
    </div>
  );
}

export default ListPage;
