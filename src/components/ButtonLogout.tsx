"use client";

import { useStore } from "@/store/user.store";
import { useRouter } from "next/navigation";

export default function ButtonLogout() {
  const router = useRouter();

  const { user, logout } = useStore((state) => state);

  const salir = () => {
    logout();
    router.push("/auth");
  };

  return (
    <div className="flex flex-col justify-end items-end">
      <span>{user?.fullname}</span>
      <button type="button" onClick={() => salir()} className="text-red-500">
        Cerrar sesion
      </button>
    </div>
  );
}
