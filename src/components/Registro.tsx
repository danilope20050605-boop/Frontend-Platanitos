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
import { Link } from "react-router-dom";

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
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      documentType: "dni",
      acceptTerms: false,
      acceptPromo: false,
    },
  });

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col items-center pt-10 pb-12 px-4">
      <div className="w-full max-w-[550px] bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-center mb-8">Crea tu cuenta</h1>

        <div className="flex bg-gray-50 rounded-xl p-1 mb-8">
          <button className="flex-1 py-3 text-sm font-medium text-green-800 border-b-2 border-green-800">
            Correo electrónico
          </button>
        </div>

        <Form {...form}>
          <form className="space-y-4">
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[110px] border-none bg-white focus:ring-0 h-full rounded-none border-r">
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

            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Nombres"
                className="h-14 rounded-xl border-gray-200"
              />
              <Input
                placeholder="Apellidos"
                className="h-14 rounded-xl border-gray-200"
              />
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  className="mt-1 border-gray-300 data-[state=checked]:bg-[#004d00] data-[state=checked]:border-[#004d00]"
                />
                <label
                  htmlFor="terms"
                  className="text-[13px] text-gray-500 leading-snug"
                >
                  <span className="text-red-500">*</span> He leído y acepto los{" "}
                  <span className="text-green-800 underline font-medium cursor-pointer">
                    Términos y condiciones
                  </span>{" "}
                  y{" "}
                  <span className="text-green-800 underline font-medium cursor-pointer">
                    Política de Privacidad
                  </span>
                </label>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="promo"
                  className="mt-1 border-gray-300 data-[state=checked]:bg-[#004d00] data-[state=checked]:border-[#004d00]"
                />
                <label
                  htmlFor="promo"
                  className="text-[13px] text-gray-500 leading-snug"
                >
                  Autorizo el tratamiento de mis datos para fines de prospección
                  y promoción comercial
                </label>
              </div>
            </div>

            <Button className="w-full h-14 bg-[#004d00] hover:bg-[#003300] text-white rounded-xl font-bold text-lg tracking-widest uppercase mt-6">
              CREA TU CUENTA
            </Button>
          </form>
        </Form>

        <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col items-center">
          <p className="text-sm text-gray-400 mb-5 font-medium">
            ¿Ya tienes una cuenta?
          </p>
          <Link to="/login" className="w-full">
            <Button
              variant="outline"
              className="w-full h-14 rounded-xl border-green-800 text-green-800 font-bold hover:bg-green-50 uppercase tracking-widest"
            >
              Iniciar sesión
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
