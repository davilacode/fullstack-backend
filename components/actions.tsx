import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { useEditClients } from "@/functions/clients/hooks/useClients";
import { MoreHorizontal } from "lucide-react";


type Props = {
  id: string;
}

const Actions = ({ id }: Props) => {

  const { onOpen } = useEditClients();
  
  return ( 
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onOpen(id)}>Editar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  );
}
 
export default Actions;