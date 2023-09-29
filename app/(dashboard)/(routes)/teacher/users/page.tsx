import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { db } from "@/lib/db";

const UsersPage = async () => {
  // Fetch user data from API or database
  const userData = await db.profile.findMany();

  return (
    <div className="p-6">
      <h1>Users</h1>
       <DataTable columns={columns} data={userData} /> 
    </div>
  );
};

export default UsersPage;