'use client';

import { useRouter } from 'next/navigation';

import Breadcrumb from '@/app/components/Breadcrumb';
import UserManagementForm from '@/app/components/form/user-management-form';

export default function CreateUserForm() {
  const router = useRouter();

  const handleCreate = (data: any) => {
    console.log('FORM DATA:', data);

    // router.push('/dashboard/user-management');
  };

  return (
    <div>
      <h1 className="font-semibold text-xl mb-1 text-primary-light">Tambah User</h1>
      <Breadcrumb />

      <UserManagementForm mode="create" onSubmit={handleCreate} />
    </div>
  );
}
