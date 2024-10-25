export const Footer = () => {

  const fullYear = new Date().getFullYear();

  return (
    <footer className="py-2 fixed bottom-0 left-0 bg-[#FF7917] text-center w-full px-4 text-white">
      <summary className="list-none">
        © {fullYear} | Made with ❤️ by (<a href="https://github.com/davilacode/fullstack-backend" target="_blank" rel="noreferrer noopener" className="underline">DavilaCode</a>)
      </summary>
    </footer>
  );
}