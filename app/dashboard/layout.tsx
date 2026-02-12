import { getMe } from '@/services/auth';
import Header from './Header';
import Sidebar from './Sidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getMe();

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header user={user.data.user_details.fullname} role={user.data.role.name}/>
        <main className="p-5 dashboard-main flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
