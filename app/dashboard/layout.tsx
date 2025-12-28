import { getMe } from '@/services/auth';
import Header from './Header';
import Sidebar from './Sidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getMe();

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header user={user.user_details.nickname} />
        <main className="p-4 bg-white flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
