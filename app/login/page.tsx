// /app/login/page.tsx
'use client';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import config from '@/amplifyconfiguration.json';
Amplify.configure(config);

type User = {
  signInDetails: {
    loginId: string;
  };
};

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <Authenticator>
      {({ signOut, user: authUser }) => {
        setUser(authUser as User); // Cast authUser to the custom User type
        return (
          <>
            <main>
              <h1>Hello {user?.signInDetails.loginId}</h1>
              <button onClick={signOut}>Sign out</button>
            </main>
          </>
        );
      }}
    </Authenticator>
  );
}
