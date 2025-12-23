// services/auth.ts
import { cookies } from 'next/headers';

export async function getMe() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    headers: {
      Cookie: `access_token=${token}`,
    },
    cache: 'no-store', // important
  });

  if (!res.ok) return null;

  return res.json();
}
