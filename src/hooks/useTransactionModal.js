// hooks/useTransactionModal.js
import { useState } from "react";

export function useTransactionModal() {
  const [txDetails, setTxDetails] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (tx) => {
    setTxDetails(tx)
    setIsOpen(true);
  };
  const closeModal = () => {
    setTxDetails(null)
    setIsOpen(false);
  };

  return {
    txDetails,
    isOpen,
    openModal,
    closeModal,
  };
}
