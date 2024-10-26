import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react";

type Props = {
  id: string;
  onOpen: (id: string) => void;
}

const Actions = ({ id, onOpen }: Props) => {

  
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