import ClientLanding from '@/components/sections/ClientLanding';
import { Providers } from '../providers';
import { Toaster } from 'react-hot-toast';

export default function ClientsPage() {
  return (
    <html lang='en'>
      <body className='bg-[#000318] bg-grid-white/[0.02] text-white min-h-screen w-full overflow-x-hidden dark overscroll-none'>
        <Providers>
          <ClientLanding />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
