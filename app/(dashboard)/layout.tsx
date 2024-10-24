import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = (
  { children }: Props
) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}
 
export default DashboardLayout;