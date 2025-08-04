// hooks/useTransactionStatus.js
export function useTransactionStatus({ isLoading, isSuccess, isError, error }) {
  let status = "idle";
  if (isLoading) status = "pending";
  else if (isSuccess) status = "success";
  else if (isError) status = "error";

  return {
    status,
    errorMessage: error?.message || null,
    isLoading,
    isSuccess,
    isError,
  };
}
