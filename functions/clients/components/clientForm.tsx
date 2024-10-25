import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';

// componentes de la UI
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";

// esquema de validación
import { insertClientsSchema } from '@/db/schema';

const formSchema = insertClientsSchema.pick({
  name: true,
  email: true,
  phone: true,
  address: true
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

// Formulario para crear y editar clientes
export const ClientForm = ({
  id, defaultValues, onSubmit, disabled, onDelete
}: Props) => {

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const handleSubmit = ((values: FormValues) => {
    onSubmit(values);
  });

  const handleDelete = (() => {
    onDelete?.();
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Nombre</FormLabel>
              <FormControl>
                <Input 
                  id={field.name}
                  disabled={disabled}
                  placeholder="Juan Perez"
                  required
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Correo electrónico</FormLabel>
              <FormControl>
                <Input 
                  id={field.name}
                  disabled={disabled}
                  placeholder="juan@perez.com"
                  type="email"
                  required
                  {...field} 
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Teléfono</FormLabel>
              <FormControl>
                <Input 
                  id={field.name}
                  disabled={disabled}
                  type="tel"
                  placeholder="1234567890"
                  pattern="[0-9]{10}"
                  {...field} 
                  value={field.value ?? ''}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="address"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Dirección</FormLabel>
              <FormControl>
                <Input 
                  id={field.name}
                  disabled={disabled}
                  placeholder="Calle 123 Nro 4-56"
                  required
                  {...field} 
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled}>
          {id ? "Guardar" : "Crear"}
        </Button>
        {(id) && (
          <Button type="button" variant="outline" disabled={disabled} onClick={handleDelete}>
            <Trash className="size-4" />
            Eliminar
          </Button>
        )}
      </form>
    </Form>
  );
};