import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { insertClientsSchema } from '@/db/schema';

import { useClients } from "@/functions/clients/hooks/useClients";
import { ClientForm } from "@/functions/clients/components/clientForm";
import { useCreateClients } from "@/functions/clients/api/useCreateClients";

export function ClientDialog() {

  const { isOpen, onClose } = useClients();

  const mutation = useCreateClients();


  const formSchema = insertClientsSchema.pick({
    name: true,
    email: true,
    phone: true,
    address: true
  });

  type FormValues = z.input<typeof formSchema>;

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear cliente</DialogTitle>
          <DialogDescription>
            Crea un nuevo cliente
          </DialogDescription>
        </DialogHeader>
        <ClientForm onSubmit={onSubmit} disabled={mutation.isPending} defaultValues={
          {
            name: "",
            email: "",
            phone: "",
            address: ""
          }
        } />
      </DialogContent>
    </Dialog>
  )
}
