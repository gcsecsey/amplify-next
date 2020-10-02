import React, { useEffect, useState } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

Amplify.configure(awsconfig);

export const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then(userData => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }

  return (
    <div>
      <div>User: {user ? JSON.stringify(user.attributes) : 'None'}</div>
      {user ? (
        <div>
          <button onClick={() => Auth.signOut()}>Sign Out</button>
        </div>
      ) : (
        <>
        <button
          onClick={() =>
            Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Facebook,
            })
          }
        >
          Facebook Sign In
        </button>
        <button
        onClick={() =>
          Auth.federatedSignIn()
        }
      >
        Open Hosted UI
      </button>
      </>
      )}
    </div>
  );
};