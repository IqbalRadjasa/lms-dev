import { getMe } from '@/services/auth';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getMe();

  return (
    <>
      <header className="p-4 bg-blue-800 text-white">Welcome, {user.user_details.fullname}</header>
      <main>{children}</main>
    </>
  );
}
