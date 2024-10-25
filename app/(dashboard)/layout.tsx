import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

type Props = {
  children: React.ReactNode;
}

const DashboardLayout = (
  { children }: Props
) => {
  return (
    <>
      <Header />
      <main>
        <section className="max-w-screen-2xl px-4 py-8 mx-auto">
          {children}
        </section>
      </main>
      <Footer />
    </>
  );
}
 
export default DashboardLayout;