import React, { useEffect, useState } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Button, Divider } from '@blueprintjs/core';

Amplify.configure(awsconfig);

export const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then((userData) => setUser(userData));
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

    getUser().then((userData) => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log('Not signed in'));
  }

  return (
    <div>
      {user ? (
        <div>
          <button onClick={() => Auth.signOut()}>Sign Out</button>
          {console.log(user)}
          <pre>Family name: {user.attributes.family_name}</pre>
          <pre>Given name: {user.attributes.given_name}</pre>
          <pre>E-mail: {user.attributes.email}</pre>
        </div>
      ) : (
        <>
          <Button
            large={true}
            outlined={true}
            onClick={() =>
              Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Facebook,
              })
            }
          >
            Facebook Sign In
          </Button>
          <Button
            large={true}
            outlined={true}
            fill={true}
            onClick={() =>
              Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Google,
              })
            }
          >
            Google Sign In
          </Button>
          <Divider />
          <Button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</Button>
        </>
      )}
    </div>
  );
};
