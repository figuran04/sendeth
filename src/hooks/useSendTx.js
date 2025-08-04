import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";

export function useSendTx(formData) {
  return useSendTransaction({
    to: formData.toAddress,
    value: formData.amount ? parseEther(formData.amount) : undefined,
  });
}
