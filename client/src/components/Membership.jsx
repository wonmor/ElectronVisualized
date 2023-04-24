import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Background } from './Geometries';

function Membership() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unregisterAuthObserver();
    };
  }, []);

  return (
    <>
      <div className="bg-gray-700 pb-5 overflow-auto" style={{ "min-height": "100vh" }}>
        <div className="text-center pt-10 pl-5 pr-5 text-gray-400">
          {user ? (
            <div>
              <h1 className="sm:pb-5 scale-75 sm:scale-100">
                <span className="text-white">
                  Welcome, {user.displayName || user.email}!
                </span>
              </h1>
              <p>This is your membership page.</p>
            </div>
          ) : (
            <div>
              <h1 className="sm:pb-5 scale-75 sm:scale-100">
                <span className="text-white">
                  Please sign in to access your membership page.
                </span>
              </h1>
            </div>
          )}
        </div>
      </div>
      <Background />
    </>
  );
}

export default Membership;
