"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { decryptMessage } from "../utils/crypto";

const Decrypted = () => {
  const searchParams = useSearchParams();
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [parsedData, setParsedData] = useState<any>(null);

  useEffect(() => {
    const encoded = searchParams.get("data");
    if (!encoded) return setStatus("No data provided in URL");
    try {
      const decoded = atob(encoded);
      const data = JSON.parse(decoded);
      setParsedData(data);
      setStatus("Data parsed successfully. Enter password to decrypt");
    } catch (e) {
      setStatus("Failed to parse data");
    }
  }, [searchParams]);

  const handleDecrypt = async () => {
    if (!parsedData) return;
    if (!password) return setStatus("Please enter a password");
    try {
      const result = await decryptMessage(parsedData, password);
      setDecryptedMessage(result);
      setStatus("Successfully decrypted");
    } catch (e) {
      setStatus("Failed to decrypt");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen">
      <h1 className="text-xl text-gray-500 font-semibold">Get Your Message</h1>
      <input
        className="p-2 border-2 border-gray-400 rounded-md"
        type="text"
        placeholder="Enter key to decrypt"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="rounded-md bg-blue-500 px-4 py-2 text-gray-100 cursor-pointer hover:bg-blue-300">
        Decrypt
      </button>
      <div className="border-2 border-gray-300 p-8 rounded-md gap-2 flex flex-col">
        {" "}
        <h1 className="font-bold text-gray-400">Decrypted Message</h1>
        {parsedData && (
          <span className="flex gap-4">
            <p>************</p>
            <button className="bg-blue-500 px-2 py-1 hover:bg-blue-300 rounded-md text-gray-100 cursor-pointer">
              show
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default Decrypted;
