import { useAccount, useSignMessage } from "wagmi";

const SignatureLogin = () => {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const handleSignatureLogin = async () => {
    const message = `Login ke SendEth - ${new Date().toISOString()}`;
    try {
      const signature = await signMessageAsync({ message });

      console.log("Address:", address);
      console.log("Signature:", signature);
      alert("Login berhasil!");
      // Kirim signature ke backend kalau perlu
    } catch (err) {
      console.error("Gagal login dengan signature:", err);
    }
  };

  return isConnected ? (
    <button
      onClick={handleSignatureLogin}
      className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
    >
      Login dengan Wallet 🔐
    </button>
  ) : null;
};
export default SignatureLogin;
