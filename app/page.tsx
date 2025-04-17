"use client";
import { useState } from "react";
import { encryptMessage } from "./utils/crypto";

export default function Home() {
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");

  const handleEncrypt = async () => {
    if (!message) return;
    const password = "rayzhaorukawakaede11";
    const result = await encryptMessage(message, password);
    const encodedMessage = btoa(JSON.stringify(result));
    setEncryptedMessage(encodedMessage);
  };

  const handleCopy = () => {
    if (!encryptedMessage) return;
    navigator.clipboard.writeText(encryptedMessage);
    alert("Copied to clipboard");
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-4">
      <h1 className="m-2">Encrypt a message</h1>
      <input
        type="text"
        placeholder="enter your message..."
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
      <div className="mt-8 border border-gray-200 rounded-md p-4">
        <h1 className="text-gray-700">cypher output:</h1>
        {encryptedMessage && (
          <p>
            generated, copy to clipboard{" "}
            <button
              onClick={handleCopy}
              className="bg-blue-500 text-gray-100 rounded-md px-2 py-1 ml-4 cursor-pointer hover:bg-blue-300"
            >
              copy
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
