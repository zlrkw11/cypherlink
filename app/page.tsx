"use client";
import { useState } from "react";
import { encryptMessage } from "./utils/crypto";
import { randomBytes } from "crypto";
import { Button } from "@headlessui/react";
import Link from "next/link";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
      </h1>{" "}
      <input
        type="text"
        placeholder="Enter a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border border-gray-800 rounded-md p-2"
      />
      <Button
        onClick={handleEncrypt}
        className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-gray-200"
      >
        Generate
      </Button>
      <div className=" p-10 flex flex-col gap-4">
        {encryptedMessage ? (
          <h1 className="text-gray-500 font-semibold">Message Encrypted</h1>
        ) : (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Waiting For Input</AlertTitle>
            <AlertDescription>
              Copy the message and key to decrypt it later. The Message will
              show up on a randomly generated link.
            </AlertDescription>
          </Alert>
        )}

        {encryptedMessage && (
          <div className="flex flex-col gap-2">
            {" "}
            <h1 className="text-gray-700">your one-time key</h1>
            <Button
              onClick={handleCopyKey}
              className="w-[100px] flex justify-center cursor-pointer items-center gap-2 rounded-md bg-gray-700 py-1 px-2 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-gray-200"
            >
              Copy Key
            </Button>
            <Link href={link}>
              <p className="text-gray-500 underline hover:text-gray-400">
                link to decrypted message
              </p>
            </Link>
            <Button
              onClick={handleCopy}
              className="cursor-pointer w-[100px] flex justify-center items-center gap-2 rounded-md bg-gray-700 py-1 px-2 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-gray-200"
            >
              Copy Link
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
