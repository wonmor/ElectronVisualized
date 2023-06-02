import React, { useState, useEffect } from "react";
import { isElectron } from "../Globals";
import { useNavigate } from "react-router-dom";

import firebase from "firebase/compat/app";
import Dropdown from "react-dropdown";
import Modal from "react-modal";

import "react-dropdown/style.css";
import "firebase/compat/auth";

const options = [{ value: "contact", label: "Contact Support" }];

const handleSubmit = async (event, setAlert) => {
  event.preventDefault();
  const formData = new FormData(event.target);

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  const data = {
    name: name,
    email: email,
    message: message,
  };

  try {
    const response = await fetch(`${isElectron() ? "https://electronvisual.org/" : ""}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Handle success
      setAlert('We will be in touch shortly!', 'success')
    } else {
      // Handle error
      console.error(response.status, response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
};

const ContactForm = ({ onClose, setAlert }) => {
  return (
    <div className="p-6 bg-gray-800">
      <h2 className="text-white text-2xl font-semibold mb-4">Contact Support</h2>
      <p className="text-white mb-6">Please fill out the form below to get in touch with our support team.</p>
      <form onSubmit={(event) => {
        handleSubmit(event, setAlert);
        onClose();
      }}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-white font-semibold mb-2">Name</label>
          <input type="text" id="name" name="name" className="w-full border border-gray-400 bg-gray-800 rounded py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white font-semibold mb-2">Email</label>
          <input type="email" id="email" name="email" className="w-full border border-gray-400 bg-gray-800 rounded py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-white font-semibold mb-2">Message</label>
          <textarea id="message" name="message" rows="4" className="w-full border border-gray-400 bg-gray-800 rounded py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500"></textarea>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-2"><span>Submit</span></button>
          <button type="button" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}><span>Close</span></button>
        </div>
      </form>
    </div>
  );
};

export const checkIfUserIsSubscriber = async (user) => {
  if (!user) {
    return false;
  }
  let isSubscriber = false;
  try {
    const response = await fetch(
      `${
        isElectron() ? "https://electronvisual.org" : ""
      }/api/get_subscriber_data/${user.uid}`
    );
    const data = await response.json();
    if (
      data &&
      data.subscriber.subscriptions &&
      Object.keys(data.subscriber.subscriptions).length > 0
    ) {
      isSubscriber = true;
    }
  } catch (error) {
    console.error("Error getting subscriber data:", error);
  }
  return isSubscriber;
};

const ProductDisplay = ({ navigate }) => (
  <section className="bg-transparent py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
      <div class="border border-white overflow-hidden shadow rounded-lg flex flex-col justify-center items-center text-white">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium">Monthly Plan</h3>
          <div class="mt-4 flex items-baseline justify-center">
            <span class="text-5xl font-thin">$20</span>
            <span class="ml-1 text-xl font-light">/ month</span>
          </div>
          <p class="mt-4 text-sm">Perfect for aspiring chemical engineers.</p>
        </div>
        <div class="px-4 py-3 text-center sm:px-6">
          {!isElectron() ? (
            <form
              action={`${
                isElectron() ? "https://electronvisual.org" : ""
              }/api/create-checkout-session`}
              method="POST"
            >
              <input
                type="hidden"
                name="priceId"
                value="price_1N0wUOIVyMsxlantolNUqcM1"
              />
              <input
                type="hidden"
                name="appUserId"
                value={firebase.auth().currentUser.uid}
              />
              <button
                id="checkout-and-portal-button"
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <span>Subscribe</span>
              </button>
            </form>
          ) : (
            <>
              <input
                type="hidden"
                name="priceId"
                value="price_1N0wUOIVyMsxlantolNUqcM1"
              />
              <input
                type="hidden"
                name="appUserId"
                value={firebase.auth().currentUser.uid}
              />
              <button
                id="checkout-and-portal-button"
                onClick={() => {
                  navigate("/membership-electron");
                }}
                class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <span>Subscribe</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div class="bg-black overflow-hidden shadow rounded-lg flex flex-col justify-center items-center text-white">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium">Yearly Plan</h3>
          <div class="mt-4 flex items-baseline justify-center">
            <span class="text-5xl font-thin">$40</span>
            <span class="ml-1 text-xl font-light">/ year</span>
          </div>
          <p class="mt-4 text-sm">Time to get a little more serious.</p>
        </div>
        <div class="px-4 py-3 text-center sm:px-6">
          {!isElectron() ? (
            <form
              action={`${
                isElectron() ? "https://electronvisual.org" : ""
              }/api/create-checkout-session`}
              method="POST"
            >
              <input
                type="hidden"
                name="priceId"
                value="price_1N0wVuIVyMsxlantt4KxBuPG"
              />
              <button
                id="checkout-and-portal-button"
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <span>Subscribe</span>
              </button>
            </form>
          ) : (
            <>
              <input
                type="hidden"
                name="priceId"
                value="price_1N0wVuIVyMsxlantt4KxBuPG"
              />
              <button
                id="checkout-and-portal-button"
                onClick={() => {
                  navigate("/membership-electron");
                }}
                class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <span>Subscribe</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  </section>
);

const SuccessDisplay = () => {
  return (
    <section className="flex flex-col items-center justify-center m-10">
      <div className="w-full max-w-lg p-8 bg-black rounded shadow-md">
        <div className="text-center text-green-200 mb-6">
          <h3 className="text-4xl font-thin mb-4">Congratulations!</h3>
          <p className="text-xl">You are officially a member.</p>
        </div>
        <form
          action={`${
            isElectron() ? "https://electronvisual.org" : ""
          }/api/create-portal-session`}
          method="POST"
          className="flex flex-col items-center"
        >
          <input
            type="hidden"
            name="appUserId"
            value={firebase.auth().currentUser.uid}
          />
          <button
            className="w-full p-2 text-green-200 border-2 border-green-200 rounded hover:bg-green-200 hover:text-black transition-colors duration-200"
            id="checkout-and-portal-button"
            type="submit"
          >
            <span>Manage Billing</span>
          </button>
        </form>
      </div>
    </section>
  );
};

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

const PaymentContainer = ({ navigate }) => {
  let [message, setMessage] = useState("");
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setSuccess(true);
      setSessionId(query.get("session_id"));
    }

    if (query.get("canceled")) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);

  if (!success && message === "") {
    return <ProductDisplay navigate={navigate} />;
  } else if (success && sessionId !== "") {
    return <SuccessDisplay sessionId={sessionId} />;
  } else {
    return <Message message={message} />;
  }
};

function Membership() {
  const [user, setUser] = useState(null);
  const [subscriberData, setSubscriberData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubscriber, setIsSubscriber] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');

  const showAlert = (message, type) => {
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((currentUser) => {
        setUser(currentUser);
      });

    return () => {
      unregisterAuthObserver();
    };
  }, []);

  useEffect(() => {
    const getAppUserSubscriptionData = async () => {
      try {
        const response = await fetch(
          `${
            isElectron() ? "https://electronvisual.org" : ""
          }/api/get_subscriber_data/${user.uid}`
        );
        const data = await response.json();
        setSubscriberData(data);
      } catch (error) {
        console.error("Error getting subscriber data:", error);
      }
    };

    if (user) {
      getAppUserSubscriptionData();
    }
  }, [user]);

  useEffect(() => {
    if (
      subscriberData &&
      subscriberData.subscriber.subscriptions &&
      Object.keys(subscriberData.subscriber.subscriptions).length === 0
    ) {
      setIsSubscriber(false);
    } else {
      setIsSubscriber(true);
    }
  }, [subscriberData]);

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  const customStyles = {
    content: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      border: 'none',
    }
  }

  return (
    <>
      <div
        className="pb-40 overflow-auto"
        style={{ "min-height": "100vh", width: "-webkit-fill-available" }}
      >
        <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} style={customStyles}>
          <ContactForm onClose={handleCloseModal} setAlert={showAlert} />
        </Modal>

        {modalVisible && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                onClick={closeModal}
              ></div>
              <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
                <div className="bg-gray-900 px-4 py-3 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-white">
                    {modalType === "error" ? "Error" : "Info"}
                  </h3>
                </div>
                <div className="bg-gray-900 px-4 py-5 sm:p-6">
                  <p className="text-sm text-gray-500">{modalMessage}</p>
                </div>
                <div className="bg-gray-900 px-4 py-4 sm:px-6">
                  <button
                    onClick={closeModal}
                    className="bg-blue-900 text-white py-2 px-4 rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center pt-10 pl-5 pr-5 text-gray-400">
          {user ? (
            <div>
              <h1 className="text-5xl sm:pb-5 scale-75 sm:scale-100">
                <span className="font-thin text-white">
                  Welcome,
                  <br />
                  {user.displayName || user.email}.
                </span>
              </h1>
              <p className="ml-0 mr-0 md:ml-40 md:mr-40">
                Enjoy the Pro membership benefits
                <br />
                with unlimited access to all content.
                {/* Membership page is under construction. */}
              </p>

              {!isSubscriber ? (
                <PaymentContainer navigate={navigate} />
              ) : (
                <SuccessDisplay />
              )}

              <div className="flex justify-center items-center">
                <button
                  className="m-5 bg-transparent hover:bg-blue-500 text-white hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"
                  onClick={signOut}
                >
                  <span>Sign out</span>
                </button>

                <Dropdown
                  options={options}
                  value={selectedOption}
                  placeholder="More options"
                  controlClassName="dropdown-generic bg-transparent hover:bg-blue-500 text-white hover:text-white py-2 px-4 rounded"
                  menuClassName="dropdown-generic"
                  arrowClassName="dropdown-generic"
                  onChange={handleOpenModal}
                />
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-5xl sm:pb-5 scale-75 sm:scale-100">
                <span className="text-white font-thin">
                  Please sign in to access your membership page.
                </span>
              </h1>
              <p>
                As a member, you'll be able to unlock all sorts of cool benefits
                that will enhance your use of our educational web app.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Membership;
