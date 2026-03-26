'use client';

import Breadcrumb from '@/app/components/Breadcrumb';
import UserManagementForm from '@/app/components/form/user-management-form';

export default function CreateUserForm() {

  return (
    <div>
      <h1 className="font-semibold text-xl mb-1 text-primary-light">Tambah User</h1>
      <Breadcrumb />

      <UserManagementForm />
    </div>
  );
}
