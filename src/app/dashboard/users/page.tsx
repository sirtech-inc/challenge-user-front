import TableUser from "@/components/TableUser";
import { getUsers } from "@/services/user.service";
import Link from "next/link";

export default async function Users() {
  const users = await getUsers();
  return (
    <div className="w-full flex flex-col">
      <div className="flex w-full justify-between items-center">
        <h2 className="text-xl font-semibold">Listado de Usuarios</h2>
        <Link
          href="/dashboard/user/new"
          className="border py-1 px-5 rounded-md"
        >
          Crear usuario
        </Link>
      </div>

      <TableUser users={users} />
    </div>
  );
}
