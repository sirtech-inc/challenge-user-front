import { LoginForm } from "@/components/FormLogin";

export default function Login() {
  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[350px] px-10">
        <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
          <h1 className="text-4xl mb-5">Ingresar</h1>
          <hr />
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
