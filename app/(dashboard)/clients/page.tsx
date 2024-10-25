"use client"

import { Button } from "@/components/ui/button";
import { useClients } from "@/functions/clients/hooks/useClients";


const Clients = () => {
  const { onOpen } = useClients();

  return (
    <div>
      <h2>Clientes</h2>
      <Button onClick={onOpen}>Abrir dialog</Button>
    </div>
  );
}
 
export default Clients;