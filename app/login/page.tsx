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
    <main className="min-h-screen flex-grow">
      <Authenticator>
        {({ signOut, user: authUser }) => {
          setUser(authUser as User); // Cast authUser to the custom User type
          return (
            <>
            </>
          );
        }}
      </Authenticator>
    </main>
  );
}
