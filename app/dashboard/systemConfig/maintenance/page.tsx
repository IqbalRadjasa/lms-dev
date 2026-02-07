'use client';

import React, { useState, useEffect } from 'react';

import Modal from '../../../components/Modal';
import Toggle from '../../../components/Toggle';
import Input from '@/app/components/Input';
import ButtonPrimary from '@/app/components/ButtonPrimary';
import { AlertConfirmation } from '@/app/components/AlertConfirmation';

export default function MyComponentsPage() {
  const [status, setStatus] = useState(false);
  const [open, setOpen] = useState(false);

  const [pesan, setPesan] = useState('');
  const [pesanError, setPesanError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('maintenance') === 'true';
    setStatus(saved);
  }, []);

  const validatePesan = (value: string) => {
    if (value.length < 5) {
      setPesanError('Pesan harus lebih dari 5 huruf!');
    } else {
      setPesanError('');
    }

    setPesan(value);
  };

  const [kode, setKode] = useState('');
  const [kodeError, setKodeError] = useState('');

  const validateKode = (value: string) => {
    if (value.length < 5) {
      setKodeError('Kode harus lebih dari 5 huruf!');
    } else {
      setKodeError('');
    }

    setKode(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (pesan.length < 5 || kode.length < 5) {
      setPesanError('Pesan harus lebih dari 5 huruf!');
      setKodeError('Kode harus lebih dari 5 huruf!');
      return;
    }

    AlertConfirmation('Apakah kamu yakin?', () => {
      console.log('mode on');
      localStorage.setItem('maintenance', 'true');

      window.location.reload();
    });
  };

  const handleMaintenance = () => {
    if (status) {
      AlertConfirmation('Apakah kamu yakin?', () => {
        localStorage.setItem('maintenance', 'false');
        setStatus(false);
      });
    } else {
      setStatus(true);
      setOpen(true);
    }
  };

  return (
    <div>
      <h1 className="font-semibold text-2xl mb-1 text-primary-light">Maintenance</h1>
      <span className="text-sm text-primary-light">Dashboard / System Configuration / Maintenance</span>

      <div className="card mt-8">
        <div className="flex items-center">
          <span className="font-base text-primary-light mr-3">Maintenance Mode:</span>
          <Toggle checked={status} onChange={handleMaintenance} />
          <span className="font-semibold text-primary-light ml-2">{!status ? 'Off' : 'On'}</span>
        </div>
      </div>

      <Modal open={open} onClose={() => setStatus(false)} title="Maintenance">
        <form onSubmit={handleSubmit}>
          <img src="/maintenance.jpg" className="w-100 h-auto mx-auto" />

          <Input label="Masukkan pesan" value={pesan} onChange={validatePesan} placeholder="....." required />
          {pesanError && <span className="text-red-600 text-xs font-semibold block">{pesanError}</span>}

          <Input label="Masukkan kode aktivasi" value={kode} onChange={validateKode} placeholder="....." required />
          {kodeError && <span className="text-red-600 text-xs font-semibold block">{kodeError}</span>}

          <div className="flex justify-end gap-2 mt-4">
            <ButtonPrimary
              type="button"
              onClick={() => {
                setPesan('');
                setKode('');
                setStatus(false);
                setOpen(false);
              }}
              className="px-4 py-2 rounded text-primary-light text-sm font-semibold bg-[var(--neutral-300)]"
            >
              Batal
            </ButtonPrimary>

            <ButtonPrimary type="submit" className="px-4 py-2 rounded text-white text-sm font-semibold bg-[var(--primary-600)]">
              Kirim
            </ButtonPrimary>
          </div>
        </form>
      </Modal>
    </div>
  );
}
