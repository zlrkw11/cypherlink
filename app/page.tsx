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
  return (
    <div className="flex flex-col h-screen items-center justify-center gap-2">
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
      <div className="mt-8">
        <h1>Cypher Output:</h1>
      </div>
    </div>
  );
}
