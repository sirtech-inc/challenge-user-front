"use client";

import { User } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

import { Button } from "./ui/button";
import { toast } from "sonner";
import { createUser, updateUser } from "@/services/user.service";
import { useState } from "react";

interface Props {
  user: User;
}

const formSchema = z.object({
  fullname: z.string().min(2, "Nombres completos es requerido"),
  email: z.string().email({
    message: "Email es invalido",
  }),
  password: z.string().min(2, "Contraseña es requerida"),
  confirPassword: z.string().min(2, "Confirmar contraseña es requerida"),
});

export const UserForm = ({ user }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: user.fullname ?? "",
      email: user.email ?? "",
      password: "",
      confirPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password !== values.confirPassword) {
      return toast("Las contraseña no son iguales", { position: "top-center" });
    }
    setLoading(true);

    if (user && user.id) {
      await updateUser(user.id, {
        fullName: values.fullname,
        email: values.email,
        password: values.password,
        state: user.state,
      });

      toast("Usuario actualizado correctamente", { position: "top-center" });
    } else {
      await createUser({
        fullName: values.fullname,
        email: values.email,
        password: values.password,
      });

      toast("Usuario creado correctamente", { position: "top-center" });
    }

    router.replace(`/dashboard/users`);
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5 mt-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input placeholder="Escribe apellidos y nombres" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Escribe correo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row gap-5 items-center w-full justify-center">
          <Button type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Guardar"}
          </Button>
          <Button
            onClick={() => router.replace(`/dashboard/users`)}
            type="button"
            variant="secondary"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  );
};
