import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email({ message: "Introduce un correo válido." }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

export function Login() {
  const navigate = useNavigate(); 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        localStorage.setItem("usuario", JSON.stringify(data));
        
        alert(`¡Bienvenido de nuevo, ${data.nombres}!`);
        
        navigate("/");
        
        window.location.reload();
        
      } else {
        const errorText = await response.text();
        alert("Error de autenticación: " + errorText);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo establecer comunicación con el servidor backend.");
    }
  }

  return (
    <div className="min-h-[90vh] bg-gray-100 flex flex-col items-center pt-10 px-4">
      <div className="w-full max-w-[500px] bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-semibold text-center mb-8">
          Iniciar sesión
        </h1>

        <div className="flex bg-gray-50 rounded-xl p-1 mb-8">
          <button type="button" className="flex-1 py-3 text-sm font-medium text-green-800 border-b-2 border-green-800">
            Correo electrónico
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Correo electrónico"
                      className="h-14 rounded-xl border-gray-300"
                      {...field}
                    />
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
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Contraseña"
                      className="h-14 rounded-xl border-gray-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-14 bg-[#638d64] hover:bg-[#527553] text-white rounded-xl font-bold text-lg tracking-widest uppercase"
            >
              CONTINUAR
            </Button>
          </form>
        </Form>

        <p className="text-[11px] text-gray-500 text-center mt-6 leading-relaxed">
          Con tu cuenta Platanitos, comienzas a acumular puntos que puedes usar
          como descuentos. 💰
        </p>

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-4 font-medium">
            ¿Aún no tienes una cuenta?
          </p>
          <Link to="/registro" className="w-full">
            <Button
              type="button"
              variant="outline"
              className="w-full h-14 rounded-xl border-green-800 text-green-800 font-bold hover:bg-green-50 uppercase tracking-widest"
            >
              Crea tu cuenta
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
