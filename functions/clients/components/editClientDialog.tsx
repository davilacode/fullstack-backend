import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { insertClientsSchema } from '@/db/schema';

import { useEditClients } from "@/functions/clients/hooks/useClients";
import { ClientForm } from "@/functions/clients/components/clientForm";
import { useUpdateClient } from "@/functions/clients/api/useUpdateClient";
import { useGetClient } from "@/functions/clients/api/useGetClient";

export function EditClientDialog() {

  const { isOpen, onClose, id } = useEditClients();

  const clientQuery = useGetClient(id);
  const mutation = useUpdateClient(id);

  const isLoading = clientQuery.isLoading;

  const isPending = mutation.isPending;

  const defaultValues = clientQuery.data ? {
    name: clientQuery.data.name,
    email: clientQuery.data.email,
    phone: clientQuery.data.phone,
    address: clientQuery.data.address
  } : { name: "", email: "", phone: "", address: ""
  };

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
          <DialogTitle>Editar cliente</DialogTitle>
          <DialogDescription>
            Editar información completa del cliente
          </DialogDescription>
        </DialogHeader>
        {isLoading ? 
          <div>Loading...</div>
          :
          <ClientForm onSubmit={onSubmit} disabled={isPending} defaultValues={defaultValues} />
        }
      </DialogContent>
    </Dialog>
  )
}
