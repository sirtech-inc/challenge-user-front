"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ShieldCheckIcon, Trash2, UserRoundPenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { activeUser, inactiveUser } from "@/services/user.service";
import { toast } from "sonner";

interface Props {
  users: any[];
}

export default function TableUser({ users }: Props) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const filteredUsers = (): any[] => {
    if (search.length === 0) {
      return users.slice(currentPage, currentPage + 5);
    }

    const filtered = users.filter((ele) =>
      ele.fullname.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.slice(currentPage, currentPage + 5);
  };

  const onSearchChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(target.value);
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 5);
    }
  };

  const nextPage = () => {
    if (
      users.filter((ele) =>
        ele.fullname.toLowerCase().includes(search.toLowerCase())
      ).length >
      currentPage + 5
    ) {
      setCurrentPage(currentPage + 5);
    }
  };

  const deleteUser = async (userId: string) => {
    await inactiveUser(userId);
    toast("Usuario inactivado correctamente", { position: "top-center" });
  };

  const activarUser = async (userId: string) => {
    await activeUser(userId);
    toast("Usuario activado correctamente", { position: "top-center" });
  };

  return (
    <>
      <input
        type="text"
        className="my-5 w-full border rounded-md py-2 px-5"
        placeholder="Buscar usuario"
        value={search}
        onChange={onSearchChange}
      />

      {filteredUsers().length > 0 ? (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 w-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Fecha de Creacion
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers().map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.fullname}
                    </th>
                    <td className="px-6 py-4">{item.email}</td>

                    <td className="px-6 py-4">
                      {item.state === true ? "Activo" : "Inactivo"}
                    </td>
                    <td className="px-6 py-4">{format(item.createAt, "Pp")}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-row gap-2 justify-center items-center">
                        {item.state ? (
                          <button
                            onClick={() => deleteUser(item.id)}
                            type="button"
                          >
                            <Trash2 className="text-red-500" />
                          </button>
                        ) : (
                          <button
                            onClick={() => activarUser(item.id)}
                            type="button"
                          >
                            <ShieldCheckIcon className="text-green-500" />
                          </button>
                        )}

                        <button
                          onClick={() =>
                            router.replace(`/dashboard/user/${item.id}`)
                          }
                          type="button"
                        >
                          <UserRoundPenIcon className="text-blue-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-row justify-between mt-10 gap-5">
            <button onClick={prevPage} className="border rounded-md py-2 px-6">
              Anterior
            </button>

            <button onClick={nextPage} className="border rounded-md py-2 px-6">
              Siguiente
            </button>
          </div>
        </>
      ) : (
        <div className="w-full border bg-gray-200 rounded-md py-5 flex items-center justify-center">
          <span>No hay registros</span>
        </div>
      )}
    </>
  );
}
