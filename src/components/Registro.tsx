import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom"; 

const registerSchema = z.object({
  email: z.string().email("Correo inválido"),
  documentType: z.string().min(1),
  documentNumber: z.string().min(8, "Mínimo 8 dígitos"),
  names: z.string().min(2, "Ingresa tus nombres"),
  lastNames: z.string().min(2, "Ingresa tus apellidos"),
  acceptTerms: z.boolean().refine((v) => v === true, "Debes aceptar"),
  acceptPromo: z.boolean(),
});

export function Registro() {
  const navigate = useNavigate(); 

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      documentType: "dni",
      documentNumber: "",
      names: "",
      lastNames: "",
      email: "",
      acceptTerms: false,
      acceptPromo: false,
    },
  });

  // FUNCIÓN CONECTADA A TU API EN SPRING BOOT
  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          tipoDocumento: values.documentType,
          numeroDocumento: values.documentNumber,
          nombres: values.names,
          apellidos: values.lastNames,
          password: "************",
        }),
      });

      if (response.ok) {
        alert("¡Registro exitoso! Tu cuenta ha sido creada.");
        navigate("/login"); 
        
      } else {
        const errorText = await response.text();
        alert("Hubo un problema: " + errorText);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo establecer comunicación con el servidor backend.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col items-center pt-10 pb-12 px-4">
      <div className="w-full max-w-[550px] bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-center mb-8">Crea tu cuenta</h1>

        <div className="flex bg-gray-50 rounded-xl p-1 mb-8">
          <button type="button" className="flex-1 py-3 text-sm font-medium text-green-800 border-b-2 border-green-800">
            Correo electrónico
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Correo electrónico"
                      className="h-14 rounded-xl border-gray-200 focus-visible:ring-green-800"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex overflow-hidden rounded-xl border border-gray-200 h-14 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
              <FormField
                control={form.control}
                name="documentType"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-[110px] border-none bg-white focus:ring-0 h-full rounded-none border-r flex items-center justify-center gap-6 px-2 pt-7">
                      <SelectValue placeholder="DNI" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dni">DNI</SelectItem>
                      <SelectItem value="ce">CE</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              <FormField
                control={form.control}
                name="documentNumber"
                render={({ field }) => (
                  <Input
                    placeholder="Documento"
                    className="flex-1 border-none focus-visible:ring-0 h-full rounded-none"
                    {...field}
                  />
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="names"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Nombres"
                      className="h-14 rounded-xl border-gray-200 focus-visible:ring-green-800"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastNames"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Apellidos"
                      className="h-14 rounded-xl border-gray-200 focus-visible:ring-green-800"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="space-y-4 pt-2">
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1 border-gray-300 data-[state=checked]:bg-[#004d00] data-[state=checked]:border-[#004d00]"
                      />
                    </FormControl>
                    <label className="text-[13px] text-gray-500 leading-snug">
                      <span className="text-red-500">*</span> He leído y acepto los{" "}
                      <span className="text-green-800 underline font-medium cursor-pointer">
                        Términos y condiciones
                      </span>{" "}
                      y{" "}
                      <span className="text-green-800 underline font-medium cursor-pointer">
                        Política de Privacidad
                      </span>
                    </label>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="acceptPromo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1 border-gray-300 data-[state=checked]:bg-[#004d00] data-[state=checked]:border-[#004d00]"
                      />
                    </FormControl>
                    <label className="text-[13px] text-gray-500 leading-snug">
                      Autorizo el tratamiento de mis datos para fines de prospección
                      y promoción comercial
                    </label>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full h-14 bg-[#004d00] hover:bg-[#003300] text-white rounded-xl font-bold text-lg tracking-widest uppercase mt-6">
              CREA TU CUENTA
            </Button>
          </form>
        </Form>

        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center">
          <p className="text-sm text-gray-500 mb-4 font-medium">
            ¿Tienes una cuenta?
          </p>
          <Link to="/login" className="w-full">
            <Button
              type="button"
              variant="outline" 
              className="w-full h-14 rounded-full border-green-800 text-green-800 font-bold hover:bg-green-50 uppercase tracking-widest"
            >
              Inicia sesión
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}