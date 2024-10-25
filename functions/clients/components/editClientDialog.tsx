import { z } from "zod";


import { useGetClient } from "@/functions/clients/api/useGetClient";
import { useUpdateClient } from "@/functions/clients/api/useUpdateClient";
import { useDeleteClient } from "@/functions/clients/api/useDeleteClient";
import { useEditClients } from "@/functions/clients/hooks/useClients";
import { ClientForm } from "@/functions/clients/components/clientForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { insertClientsSchema } from '@/db/schema';

// Modal para editar un cliente
export function EditClientDialog() {

  const { isOpen, onClose, id } = useEditClients();

  const clientQuery = useGetClient(id);
  const updateMutation = useUpdateClient(id);
  const deleteMutation = useDeleteClient(id);

  const isLoading = clientQuery.isLoading;
  const isPending = updateMutation.isPending || deleteMutation.isPending;

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
    updateMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    });
  }

  const onDelete = () => {
    deleteMutation.mutate(undefined, {
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
          <ClientForm 
            id={id} 
            onSubmit={onSubmit} 
            disabled={isPending} 
            defaultValues={defaultValues}
            onDelete={onDelete}
          />
        }
      </DialogContent>
    </Dialog>
  )
}
