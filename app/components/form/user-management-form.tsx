'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Input from '../Input';
import Button from '../Button';
import Select from '../Select';
import Textarea from '../TextArea';
import Dropzone from '../Dropzone';

type UserFormProps = {
  mode: 'create' | 'edit';
  initialData?: {
    role: number;
    identifier: string;
    email: string;
    fullname: string;
    nickname: string;
    placeOfBirth: string;
    dateOfBirth: string;
    department: number;
    phone: string;
    address: string;
  };
  onSubmit: (data: any) => void;
};

export default function UserManagementForm({ mode, initialData, onSubmit }: UserFormProps) {
  const router = useRouter();

  const [role, setRole] = useState(initialData?.role || 0);
  const [roleError, setRoleError] = useState('');

  const [identifier, setIdentifier] = useState(initialData?.identifier || '');
  const [identifierError, setIdentifierError] = useState('');

  const [fullname, setFullname] = useState(initialData?.fullname || '');
  const [fullnameError, setFullnameError] = useState('');

  const [nickname, setNickname] = useState(initialData?.nickname || '');
  const [nicknameError, setNicknameError] = useState('');

  const [department, setDepartment] = useState(initialData?.department || 0);
  const [departmentError, setDepartmentError] = useState('');

  const [placeOfBirth, setPlaceOfBirth] = useState(initialData?.placeOfBirth || '');
  const [placeOfBirthError, setPlaceOfBirthError] = useState('');

  const [dateOfBirth, setDateOfBirth] = useState(initialData?.dateOfBirth || '');
  const [dateOfBirthError, setDateOfBirthError] = useState('');

  const [files, setFiles] = useState<File[]>([]);

  const [email, setEmail] = useState(initialData?.email || '');
  const [emailError, setEmailError] = useState('');

  const [phone, setPhone] = useState(initialData?.phone || '');
  const [phoneError, setPhoneError] = useState('');

  const [address, setAddress] = useState(initialData?.address || '');
  const [addressError, setAddressError] = useState('');

  let isValid = false;

  const validateIdentifier = (val: string) => {
    if (!val) {
      isValid = false;
      setIdentifierError(role == 3 ? 'NISN tidak boleh kosong!' : 'NIP tidak boleh kosong!');
    } else {
      setIdentifierError('');
    }

    setIdentifier(val);
  };

  const validateFullname = (val: string) => {
    if (!val) {
      isValid = false;
      setFullnameError('Nama lengkap tidak boleh kosong!');
    } else {
      setFullnameError('');
    }
    setFullname(val);
  };

  const validateNickname = (val: string) => {
    if (!val) {
      isValid = false;
      setNicknameError('Nama panggilan tidak boleh kosong!');
    } else {
      setNicknameError('');
    }

    setNickname(val);
  };

  const validatePlaceOfBirth = (val: string) => {
    if (!val) {
      isValid = false;
      setPlaceOfBirthError('Tempat lahir tidak boleh kosong!');
    } else {
      setPlaceOfBirthError('');
    }

    setPlaceOfBirth(val);
  };

  const validateDateOfBirth = (val: string) => {
    if (!val) {
      isValid = false;
      setDateOfBirthError('Tanggal lahir tidak boleh kosong!');
    } else {
      setDateOfBirthError('');
    }

    setDateOfBirth(val);
  };

  const validateEmail = (val: string) => {
    if (!val) {
      isValid = false;
      setEmailError('Email tidak boleh kosong!');
    } else {
      setEmailError('');
    }

    setEmail(val);
  };

  const validatePhone = (val: string) => {
    if (!val) {
      isValid = false;
      setPhoneError('Nomor Telepon tidak boleh kosong!');
    } else {
      setPhoneError('');
    }

    setPhone(val);
  };

  const validateAddress = (val: string) => {
    if (!val) {
      isValid = false;
      setAddressError('Alamat tidak boleh kosong!');
    } else {
      setAddressError('');
    }

    setAddress(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isValid);

    const formData = {
      role,
      identifier,
      email,
      fullname,
      nickname,
      placeOfBirth,
      dateOfBirth,
      department,
      phone,
      address,
    };

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card mt-8">
        <div className="card-header border-b-1">
          <h6 className="font-semibold text-primary-light">Informasi Akun</h6>
        </div>
        <div className="card-body">
          <div className="flex gap-2">
            <div className="w-1/2">
              <Select
                label="Peran"
                placeholder="Pilih disini"
                value={role}
                onChange={setRole}
                options={[
                  { label: 'Admin', value: 1 },
                  { label: 'Guru', value: 2 },
                  { label: 'Siswa', value: 3 },
                ]}
                className="h-auto w-full"
              />
            </div>
            <div className="w-1/2">
              <Input label={role == 3 ? 'NISN' : 'NIP'} value={identifier} onChange={validateIdentifier} placeholder="....." required message={identifierError} />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-1/2">
              <Input label="Email" type="email" value={email} onChange={validateEmail} placeholder="....." required message={emailError} />
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header border-b-1">
          <h6 className="font-semibold text-primary-light">Informasi Pribadi</h6>
        </div>

        <div className="card-body">
          <div className="flex gap-2">
            <div className="w-1/2">
              <Input label="Nama Lengkap" value={fullname} onChange={validateFullname} placeholder="....." required message={fullnameError} />
            </div>
            <div className="w-1/2">
              <Input label="Nama Panggilan" value={nickname} onChange={validateNickname} placeholder="....." required message={nicknameError} />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-1/2">
              <Input label="Tempat Lahir" value={placeOfBirth} onChange={validatePlaceOfBirth} placeholder="....." required message={placeOfBirthError} />
            </div>
            <div className="w-1/2">
              <Input label="Tanggal Lahir" type="date" value={dateOfBirth} onChange={validateDateOfBirth} placeholder="....." required message={dateOfBirthError} />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-1/2">
              <Dropzone label="Pas Foto" onChange={setFiles} />
            </div>
            <div className="w-1/2">
              <div className="pt-3">
                <p className="text-xs leading-5">Ketentuan upload foto:</p>
                <p className="text-xs leading-5">*Maksimal ukuran file 1-2 MB</p>
                <p className="text-xs leading-5">*Dimensi foto 300x400 px</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header border-b-1">
          <h6 className="font-semibold text-primary-light">Informasi Akademik</h6>
        </div>

        <div className="card-body">
          <div className="flex gap-2">
            <div className="w-1/2">
              <Select
                label="Jurusan"
                placeholder="Pilih disini"
                value={department}
                onChange={setDepartment}
                options={[
                  { label: 'Rekayasa Perangkat Lunak', value: 1 },
                  { label: 'Multimedia', value: 2 },
                  { label: 'Akomodasi Perhotelan', value: 3 },
                  { label: 'Teknis Bisnis Sepeda Motor', value: 4 },
                  { label: 'Umum', value: 5 },
                ]}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header border-b-1">
          <h6 className="font-semibold text-primary-light">Kontak</h6>
        </div>

        <div className="card-body">
          <div className="flex gap-2">
            <div className="w-1/2">
              <Input label="Nomor Telepon" value={phone} onChange={validatePhone} placeholder="....." required message={phoneError} />
            </div>
            <div className="w-1/2">
              <Textarea label="Alamat" placeholder="....." value={address} onChange={validateAddress} rows={5} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <Link href="/dashboard/user-management">
          <Button
            primary={false}
            onClick={() => {
              router.push('/dashboard/user-management');
            }}
          >
            Kembali
          </Button>
        </Link>

        <Button primary={true} type="submit">
          {mode == 'create' ? 'Simpan' : 'Ubah'}
        </Button>
      </div>
    </form>
  );
}
