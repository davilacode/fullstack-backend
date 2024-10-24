export const Footer = () => {

  const fullYear = new Date().getFullYear();

  return (
    <footer className="py-2 shadow-md fixed bottom-0 left-0 bg-[#FF7917] text-center w-full px-4 text-white">
       © Copyrigth {fullYear} - Todos los derechos reservados 
    </footer>
  );
}