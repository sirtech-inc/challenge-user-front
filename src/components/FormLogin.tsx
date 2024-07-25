"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { login } from "@/services/user.service";
import { toast } from "sonner";
import { useStore } from "@/store/user.store";

const formSchema = z.object({
  email: z.string().email({
    message: "Email es invalido",
  }),
  password: z.string().min(2, "Contraseña es requerida"),
});

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { setLogin } = useStore((state) => state);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const response = await login(values);
    setLoading(false);
    if (response.error) {
      return toast(response.message, { position: "top-center" });
    }

    setLogin(response.data.user, response.data.token);
    router.push("/dashboard");
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5 mt-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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

        <Button disabled={loading} type="submit">
          {loading ? "Cargando..." : "Ingresar"}
        </Button>
      </form>
    </Form>
  );
};
