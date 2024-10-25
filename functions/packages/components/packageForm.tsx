import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { insertPackagesSchema } from '@/db/schema';

const formSchema = insertPackagesSchema

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  disabled?: boolean;
};

export const PackageForm = ({
  id, defaultValues, onSubmit, disabled 
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
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel htmlFor={field.name}>Contenido</FormLabel>
              <FormControl>
                <Input 
                  id={field.name}
                  disabled={disabled}
                  placeholder="Productos electrónicos, "
                  required
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full">
          {id ? "Guardar" : "Crear"}
        </Button>
      </form>
    </Form>
  );
};