import { Title } from "@/components/Title";
import { UserForm } from "@/components/UserForm";
import { getUserBySlug } from "@/services/user.service";
import { redirect } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default async function UserPage({ params }: Props) {
  const { slug } = params;

  const user = await getUserBySlug(slug);
  if (!user && slug !== "new") {
    redirect("/dashboard/users");
  }

  const title = slug === "new" ? "Nuevo Usuario" : "Editar usuario";

  return (
    <>
      <Title title={title} />

      <UserForm user={user ?? {}} />
    </>
  );
}
