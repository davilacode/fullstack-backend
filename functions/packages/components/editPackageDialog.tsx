import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { insertPackagesSchema } from '@/db/schema';

import { useGetPackage } from "@/functions/packages/api/useGetPackage";
import { useUpdatePackages } from "@/functions/packages/api/useUpdatePackages";
import { useGetClients } from "@/functions/clients/api/useGetClients";
import { useEditPackages } from "@/functions/packages/hooks/usePackages";
import { PackageForm } from "@/functions/packages/components/packageForm";

export function EditPackageDialog() {

  const { isOpen, onClose, id } = useEditPackages();

  const packageQuery = useGetPackage(id);
  const clientQuery = useGetClients();
  const updateMutation = useUpdatePackages(id);

  const isLoading = clientQuery.isLoading || packageQuery.isLoading;
  const isPending = updateMutation.isPending;

  const defaultValues = packageQuery.data ? {
    content: packageQuery.data.content,
    senderId: packageQuery.data.senderId,
    recipientId: packageQuery.data.recipientId,
    from: packageQuery.data.from,
    to: packageQuery.data.to,
    height: packageQuery.data.height,
    large: packageQuery.data.large,
    width: packageQuery.data.width,
    weight: packageQuery.data.weight,
    type: packageQuery.data.type,
    status: packageQuery.data.status,
  } : { content: "", senderId: "", recipientId: "", from: "", to: "", height: "0" , large: "0", width: "0", weight: "0"
  }
  
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
    status: true
  });

  type FormValues = z.input<typeof formSchema>;

  const clientsValues = clientQuery.data?.map((client) => ({
    value: client.id,
    label: client.name
  })) || [];

  const onSubmit = (values: FormValues) => {
    updateMutation.mutate(values, {
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
        {isLoading ?
          <div>Loading...</div>  
          :
          <PackageForm onSubmit={onSubmit} disabled={isPending} clientsValues={clientsValues}
            defaultValues={defaultValues}
          />
        }
      </DialogContent>
    </Dialog>
  )
}
