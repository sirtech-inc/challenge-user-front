import { AreaUserState } from "@/components/AreaUserState";
import { getUsers } from "@/services/user.service";

export default async function Dashboard() {
  const user = await getUsers();

  const activos = user.filter((user) => user.state).length;
  const inactivos = user.filter((user) => !user.state).length;

  const chartData = [
    { browser: "Activos", visitors: activos, fill: "var(--color-chrome)" },
    { browser: "Inactivos", visitors: inactivos, fill: "var(--color-safari)" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <AreaUserState chartData={chartData} />
    </div>
  );
}
