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

export function ClientDialog() {

  const { isOpen, onClose } = useNewPackages();

  const mutation = useCreatePackages();


  const formSchema = insertPackagesSchema;

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
        <PackageForm onSubmit={onSubmit} disabled={mutation.isPending} />
      </DialogContent>
    </Dialog>
  )
}
