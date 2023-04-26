import React, { useState, useEffect } from 'react';
import { Background } from './Geometries';

import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
const ProductDisplay = () => (
  <section className="bg-transparent py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
      <div className="bg-white overflow-hidden shadow rounded-lg flex flex-col justify-center items-center">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Monthly Plan</h3>
          <div className="mt-4 flex items-baseline justify-center">
            <span className="text-5xl font-extrabold text-gray-900">$20</span>
            <span className="ml-1 text-xl font-semibold text-gray-500">/ month</span>
          </div>
          <p className="mt-4 text-sm text-gray-500">Perfect for aspiring chemical engineers.</p>
        </div>
        <div className="px-4 py-3 text-center sm:px-6">
          <form action="/create-checkout-session" method="POST">
            <input type="hidden" name="lookup_key" value="{{MONTHLY_PRICE_LOOKUP_KEY}}" />
            <button id="checkout-and-portal-button" type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              </span>
              <span>Subscribe Now</span>
            </button>
          </form>
        </div>
      </div>

      <div class="bg-gray-800 overflow-hidden shadow rounded-lg flex flex-col justify-center items-center text-white">
  <div class="px-4 py-5 sm:p-6">
    <h3 class="text-lg leading-6 font-medium">Yearly Plan</h3>
    <div class="mt-4 flex items-baseline justify-center">
      <span class="text-5xl font-extrabold">$40</span>
      <span class="ml-1 text-xl font-semibold">/ year</span>
    </div>
    <p class="mt-4 text-sm">Time to get a little more serious.</p>
  </div>
  <div class="px-4 py-3 text-center sm:px-6">
    <form action="/create-checkout-session" method="POST">
      <input type="hidden" name="lookup_key" value="{{YEARLY_PRICE_LOOKUP_KEY}}" />
      <button id="checkout-and-portal-button" type="submit" class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
        <span>Subscribe Now</span>
      </button>
    </form>
  </div>
</div>

    </div>
  </section>
);


const SuccessDisplay = ({ sessionId }) => {
  return (
    <section>
      <div className="product Box-root">
        <div className="description Box-root">
          <h3>Subscription to starter plan successful!</h3>
        </div>
      </div>
      <form action="/create-portal-session" method="POST">
        <input
          type="hidden"
          id="session-id"
          name="session_id"
          value={sessionId}
        />
        <button id="checkout-and-portal-button" type="submit">
          Manage your billing information
        </button>
      </form>
    </section>
  );
};

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

const PaymentContainer = () => {
  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);

  if (!success && message === '') {
    return <ProductDisplay />;
  } else if (success && sessionId !== '') {
    return <SuccessDisplay sessionId={sessionId} />;
  } else {
    return <Message message={message} />;
  }
};

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

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <>
      <div className="bg-black pb-40 overflow-auto" style={{ "min-height": "100vh", width: "-webkit-fill-available" }}>
        <div className="text-center pt-10 pl-5 pr-5 text-gray-400">
          {user ? (
            <div>
              <h1 className="text-5xl sm:pb-5 scale-75 sm:scale-100">
                <span className="text-white">
                  Welcome, {user.displayName || user.email}.
                </span>
              </h1>
              <p className="ml-0 mr-0 md:ml-40 md:mr-40">Calculating the wavefunctions of atoms and molecules requires a lot of processing power.<br />Dedicated servers with specialized hardware and software are used to perform these calculations efficiently.</p>

              <PaymentContainer />

              <button
                className="m-5 bg-transparent hover:bg-blue-500 text-white hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"
                onClick={signOut}
              >
                <span>Sign out</span>
              </button>
            </div>
          ) : (
            <div>
              <h1 className="text-5xl sm:pb-5 scale-75 sm:scale-100">
                <span className="text-white">
                  Please sign in to access your membership page.
                </span>
              </h1>
              <p>As a member, you'll be able to unlock all sorts of cool benefits that will enhance your use of our educational web app.</p>
            </div>
          )}
        </div>
      </div>
      <Background />
    </>
  );
}

export default Membership;
