// /app/login/page.tsx
'use client';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import config from '@/amplifyconfiguration.json';
Amplify.configure(config, { ssr: true });

type User = {
  signInDetails: {
    loginId: string;
  };
};

function UserHandler({ user: authUser, signOut }: { user: User | null, signOut: () => void }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (authUser) {
      setUser(authUser as User);
    }
  }, [authUser]);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <>
      <main>
        
        <button onClick={signOut}>Sign out</button>
      </main>
    </>
  );
}

export default function LoginPage() {
  return (
    <Authenticator>
      {({ signOut, user: authUser }) => (
        <UserHandler user={authUser as User | null} signOut={() => signOut && signOut()} />
      )}
    </Authenticator>
  );
}
