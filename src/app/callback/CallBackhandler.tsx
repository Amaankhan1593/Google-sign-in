'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) {
      router.replace('/');
      return;
    }

    const exchangeCode = async () => {
      try {
        const res = await fetch(`/api/auth/callback?code=${code}`);
        if (res.ok) {
          router.replace('/welcome');
        } else {
          console.error('OAuth callback failed:', await res.text());
          router.replace('/');
        }
      } catch (err) {
        console.error('OAuth error:', err);
        router.replace('/');
      }
    };

    exchangeCode();
  }, [searchParams, router]);

  return null;
}

// 'use client';

// import { useEffect, useMemo } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';

// export default function CallbackHandler() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const code = useMemo(() => searchParams.get('code'), [searchParams]);

//   useEffect(() => {
//     if (!code) {
//       router.replace('/');
//       return;
//     }

//     const exchangeCode = async () => {
//       try {
//         const res = await fetch(`/api/auth/callback?code=${code}`);
//         if (res.ok) {
//           router.replace('/welcome');
//         } else {
//           console.error('OAuth callback failed:', await res.text());
//           router.replace('/');
//         }
//       } catch (err) {
//         console.error('OAuth error:', err);
//         router.replace('/');
//       }
//     };

//     exchangeCode();
//   }, [code, router]);

//   return null;
// }
