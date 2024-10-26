import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { insertPackagesSchema } from '@/db/schema';

import { useNewPackages } from "@/functions/packages/hooks/usePackages";
import { PackageForm } from "@/functions/packages/components/packageForm";
import { useCreatePackages } from "@/functions/packages/api/useCreatePackages";
import { useGetClients } from "@/functions/clients/api/useGetClients";

export function CreatePackageDialog() {

  const { isOpen, onClose } = useNewPackages();

  const clientQuery = useGetClients();
  const mutation = useCreatePackages();
  
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formSchema = insertPackagesSchema.pick({
    content: true,
    senderId: true,
    recipientId: true,
    from:true,
    to:true,
    height: true,
    large: true,
    width: true,
    weight: true,
  });

  const clientsValues = clientQuery.data?.map((client) => ({
    value: client.id,
    label: client.name
  })) || [];

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
          <DialogTitle>Crear envío</DialogTitle>
          <DialogDescription>
            Llena los campos para crear un nuevo envío.
          </DialogDescription>
        </DialogHeader>
        <PackageForm onSubmit={onSubmit} disabled={mutation.isPending} clientsValues={clientsValues}
          defaultValues={{
            content: "",
            senderId: "",
            recipientId: "",
            from: "",
            to: "",
            height: "0" ,
            large: "0",
            width: "0",
            weight: "0"
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
