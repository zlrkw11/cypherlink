"use client";
import { useState } from "react";
import { encryptMessage } from "./utils/crypto";
import { randomBytes } from "crypto";
import Link from "next/link";

export default function Home() {
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [link, setLink] = useState("");
  const [key, setKey] = useState(() => randomString(8));

  function randomString(length: number) {
    if (length % 2 !== 0) {
      length++;
    }
    return randomBytes(length / 2).toString("hex");
  }

  const handleEncrypt = async () => {
    if (!message) return;
    const result = await encryptMessage(message, key);
    const encodedMessage = btoa(JSON.stringify(result));
    setEncryptedMessage(encodedMessage);
    const url = `${window.location.origin}/decrypt?data=${encodeURIComponent(
      encodedMessage
    )}`;
    setLink(url);
  };

  const handleCopy = () => {
    if (!encryptedMessage) return;
    navigator.clipboard.writeText(link);
    alert("Copied to clipboard");
  };

  const handleCopyKey = () => {
    if (!key) return;
    navigator.clipboard.writeText(key);
    alert("Copied to clipboard");
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-4">
      <h1 className="m-2 text-xl text-gray-500 font-semibold border-b-2 border-gray-200">
        Encrypt a message
      </h1>
      <input
        type="text"
        placeholder="Enter a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border border-gray-800 rounded-md p-2"
      />
      <button
        onClick={handleEncrypt}
        className="bg-blue-500 text-gray-100 rounded-md p-2 hover:bg-blue-300 cursor-pointer"
      >
        generate
      </button>
      <div className="mt-8 border border-gray-200 rounded-md p-10 flex flex-col gap-4">
        {encryptedMessage ? (
          <h1 className="text-gray-700">Encrypted Message</h1>
        ) : (
          <h1 className="text-gray-700">Waiting For Input...</h1>
        )}

        {encryptedMessage && (
          <div className="flex flex-col gap-2">
            {" "}
            <h1 className="text-gray-700">your one-time key</h1>
            <button
              onClick={handleCopyKey}
              className="bg-blue-500 text-gray-100 rounded-md px-2 py-1 cursor-pointer hover:bg-blue-300"
            >
              copy
            </button>
            <Link href={link}>
              <p className="text-blue-400 underline hover:text-blue-200">
                link to decrypted message
              </p>
            </Link>
            <button
              onClick={handleCopy}
              className="bg-blue-500 text-gray-100 rounded-md px-2 py-1 cursor-pointer hover:bg-blue-300"
            >
              copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
