import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input, Select } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { insertPackagesSchema } from '@/db/schema';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formSchema = insertPackagesSchema.pick({
  content: true,
  senderId: true,
  recipientId: true,
  type:true,
  from:true,
  to:true,
  height: true,
  large: true,
  width: true,
  weight: true,
});
const TYPE = ["letter", "package"] as const;

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  clientsValues: { value: string; label: string }[];
  onSubmit: (values: FormValues) => void;
  disabled?: boolean;
};

export const PackageForm = ({
  id, defaultValues, onSubmit, disabled, clientsValues
}: Props) => {

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const handleSubmit = ((values: FormValues) => {
    onSubmit(values);
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Contenido</FormLabel>
                <FormControl>
                  <Input 
                    id={field.name}
                    disabled={disabled}
                    placeholder="Ej. Productos electrónicos, "
                    required
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="type"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="pb-3 block">Tipo de paquete</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? 'letter'}
                    className="flex flex-col space-y-1 mt-2"
                  >
                    {TYPE.map((value) => (
                      <FormItem key={value} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem className="me-2" value={value} disabled={disabled} />
                        </FormControl>
                        <FormLabel className="inline-block px-2 font-normal">
                          {value}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <FormField
            name="senderId"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={field.name}>Remitente</FormLabel>
                <FormControl>
                  <Select
                    id={field.name}
                    disabled={disabled}
                    required
                    options={clientsValues.filter(client => client.value !== form.watch('recipientId'))}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="recipientId"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={field.name}>Destinatario</FormLabel>
                <FormControl>
                  <Select
                  id={field.name}
                  disabled={disabled}
                  required
                  options={clientsValues.filter(client => client.value !== form.watch('senderId'))}
                  {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <FormField
            name="from"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={field.name}>Dirección origen</FormLabel>
                <FormControl>
                  <Input 
                    id={field.name}
                    disabled={disabled}
                    placeholder="San cristobal"
                    required
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="to"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={field.name}>Dirección destino</FormLabel>
                <FormControl>
                  <Input 
                    id={field.name}
                    disabled={disabled}
                    placeholder="Caracas"
                    required
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <FormField
            name="height"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-50 lg:w-1/4">
                <FormLabel htmlFor={field.name}>Altura (cm)</FormLabel>
                <FormControl>
                  <Input 
                    id={field.name}
                    type="number"
                    min={1}
                    disabled={disabled}
                    placeholder="10"
                    required
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="width"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-50 lg:w-1/4">
                <FormLabel htmlFor={field.name}>Ancho (cm)</FormLabel>
                <FormControl>
                  <Input 
                    id={field.name}
                    type="number"
                    min={1}
                    disabled={disabled}
                    placeholder="10"
                    required
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="large"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-50 lg:w-1/4">
                <FormLabel htmlFor={field.name}>Largo (cm)</FormLabel>
                <FormControl>
                  <Input 
                    id={field.name}
                    type="number"
                    min={1}
                    disabled={disabled}
                    placeholder="10"
                    required
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="weight"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-1/2 lg:w-1/4">
                <FormLabel htmlFor={field.name}>Peso (kg)</FormLabel>
                <FormControl>
                  <Input 
                    id={field.name}
                    type="number"
                    min={1}
                    disabled={disabled}
                    placeholder="0.5"
                    required
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full" disabled={disabled}>
          {id ? "Guardar" : "Crear"}
        </Button>
      </form>
    </Form>
  );
};