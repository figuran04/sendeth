"use client";

import CustomConnectButton from "@/components/ui/CustomConnectButton";
import TransactionHistory from "@/components/TransactionHistory";
import TransactionDetailModal from "@/components/TransactionDetailModal";

import { useSendTx } from "@/hooks/useSendTx";
import { useTransactionHistory } from "@/hooks/useTransactionHistory";
import { useTransactionModal } from "@/hooks/useTransactionModal";
import { useFormData } from "@/hooks/useFormData";
import { useTransactionStatus } from "@/hooks/useTransactionStatus";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Hero from "@/components/sections/Hero";
import LoadingScreen from "@/components/ui/LoadingScreen";
import useHasMounted from "@/hooks/useHasMounted";
import WalletForm from "@/components/forms/WalletForm";
import { useWalletInfo } from "@/hooks/useWalletInfo";

const ConnectPage = () => {
  const isMounted = useHasMounted();

  const wallet = useWalletInfo();
  const { transactions } = useTransactionHistory(
    wallet.address,
    wallet.chain?.id
  );

  const { formData, setFormData } = useFormData();
  const { sendTransaction, isLoading, isSuccess, isError, error } =
    useSendTx(formData);
  const txStatus = useTransactionStatus({
    isLoading,
    isSuccess,
    isError,
    error,
  });

  const { txDetails, openModal, closeModal, isOpen } = useTransactionModal();

  if (!isMounted) return <LoadingScreen />;

  return (
    <main className="relative min-h-screen px-4 mx-auto py-10 flex flex-col gap-4 max-w-4xl">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-500/30 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 opacity-20 blur-2xl"></div> */}
      <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
        <Hero />
        <div className="flex flex-col gap-4 items-center md:mt-4">
          <CustomConnectButton />
          {wallet.isConnected && (
            <WalletForm
              wallet={wallet}
              formData={formData}
              setFormData={setFormData}
              sendTransaction={sendTransaction}
              txStatus={txStatus}
            />
          )}
        </div>
      </div>
      {wallet.isConnected && (
        <>
          <TransactionHistory
            transactions={transactions}
            wallet={wallet}
            onTxClick={openModal}
          />

          {isOpen ? (
            <TransactionDetailModal
              isOpen={isOpen}
              onClose={closeModal}
              transaction={txDetails}
              chain={wallet.chain}
            />
          ) : null}
        </>
      )}
      {/* <pre>
        {JSON.stringify(wallet, (_, value) =>
          typeof value === "bigint" ? value.toString() : value, 2)}
      </pre>
      <pre>
        {JSON.stringify({ address: wallet.address, chainId: wallet.chain?.id }, null, 2)}
      </pre>
      <pre>
        {JSON.stringify(transactions, null, 2)}
      </pre> */}
    </main>
  );
};

export default ConnectPage;
