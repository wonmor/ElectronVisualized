// useAlert.js
import { useContext } from 'react';
import AlertContext from '../../contexts/AuthContext';

const useAlert = () => useContext(AlertContext);

export default useAlert;