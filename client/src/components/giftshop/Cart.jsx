import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const loadCartItems = async () => {
      if (!user) {
        return;
      }

      const cartRef = firebase.firestore().collection("customers-web").doc(user.uid);

      const unsubscribe = cartRef.onSnapshot(async (cartDoc) => {
        if (!cartDoc.exists) {
          setItems([]);
        } else {
          const { items } = cartDoc.data();
          const itemIds = Object.keys(items);

          const itemDocs = await Promise.all(
            itemIds.map((itemId) =>
              firebase.firestore().collection("items").doc(itemId).get()
            )
          );

          const cartItems = itemDocs.reduce((acc, doc) => {
            const itemId = doc.id;
            const itemData = doc.data();

            if (itemData) {
              const existingItem = acc.find((item) => item.id === itemId);
              if (existingItem) {
                const quantityToAdd = Number(items[itemId]) || 0;
                existingItem.quantity += quantityToAdd;
              } else {
                acc.push({
                  id: itemId,
                  quantity: Number(items[itemId]) || 0,
                  ...itemData,
                });
              }
            }

            return acc;
          }, []);

          setItems(cartItems);
        }
      });
      return () => unsubscribe();
    };

    loadCartItems();
  }, [user]); // Add 'items' to the dependency array

  const updateQuantity = async (itemId, newQuantity) => {
    if (!user) {
      return;
    }
    const cartRef = firebase.firestore().collection("customers-web").doc(user.uid);
    const cartDoc = await cartRef.get();
    if (!cartDoc.exists) {
      return;
    }
    const { items } = cartDoc.data();
    const updatedItems = { ...items, [itemId]: newQuantity };
    await cartRef.update({ items: updatedItems });

    const updatedCartItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setItems(updatedCartItems);
  };

  const removeItem = async (itemId) => {
    if (!user) {
      return;
    }
    const cartRef = firebase.firestore().collection("customers-web").doc(user.uid);
    const cartDoc = await cartRef.get();
    if (!cartDoc.exists) {
      return;
    }
    const { items } = cartDoc.data();
    const updatedItems = { ...items };
    delete updatedItems[itemId];
    await cartRef.update({ items: updatedItems });

    const updatedCartItems = items.filter((item) => item.id !== itemId);
    setItems(updatedCartItems);
  };

  const calculateTotalCost = () => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const hst = subtotal * 0.15;
    const total = subtotal + hst;
    return total.toFixed(2);
  };

  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-thin text-white mb-10">Your Cart</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Item Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quantity
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Remove</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={item.image}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <span className="text-sm font-medium text-gray-900">
                        {item.name + " "}
                      </span>
                      <span className="text-sm text-gray-500">
                        {item.description}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span>
                    ${item.price}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex justify-center items-center">
                    <button
                      className="text-gray-500 focus:outline-none"
                      onClick={() => {
                        const newQuantity = item.quantity - 1;
                        if (newQuantity >= 1) {
                          updateQuantity(item.id, newQuantity);
                        }
                      }}
                    >
                      <span>-</span>
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    <button
                      className="text-gray-500 focus:outline-none"
                      onClick={() => {
                        const newQuantity = item.quantity + 1;
                        updateQuantity(item.id, newQuantity);
                      }}
                    >
                      <span>+</span>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-red-600 hover:text-red-900 focus:outline-none"
                    onClick={() => removeItem(item.id)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
        <div className="mt-10 flex justify-end">
          <div className="text-right">
            <span className="text-3xl font-thin text-white">
              Total of ${calculateTotalCost()}
            </span>
            <br />
            <span className="mt-1 text-sm text-gray-400">
              (Including 15% HST)
            </span>
            <br />
            <span className="mt-1 text-xl text-rose-200">
              Checkout Not Available Yet
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
