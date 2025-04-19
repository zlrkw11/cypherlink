"use client";
import { Suspense } from "react";
import Link from "next/link";
import { Button, Switch } from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { decryptMessage } from "../utils/crypto";

export default function DecryptPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Decrypted />
    </Suspense>
  );
}

const Decrypted = () => {
  const searchParams = useSearchParams();
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [parsedData, setParsedData] = useState<any>(null);
  const [show, setShow] = useState(false);

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
    if (!password) {
      console.log("no password entered");
      return setStatus("Please enter a password");
    }
    try {
      const result = await decryptMessage(parsedData, password);
      setDecryptedMessage(result);
      setStatus("Successfully decrypted");
    } catch (e) {
      setStatus("Failed to decrypt");
    }
  };

  const handleShow = () => {
    setShow(!show);
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
      <Button
        onClick={handleDecrypt}
        className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-gray-200"
      >
        Decrypt
      </Button>
      <div className="border-2 border-gray-300 p-8 rounded-md gap-2 flex flex-col">
        {" "}
        <h1 className="font-bold text-gray-400">Decrypted Message</h1>
        {decryptedMessage ? (
          <div className="flex flex-col gap-4 border rounded-md border-gray-300 p-4">
            {show ? <p>{decryptedMessage}</p> : <p>************</p>}

            <Switch
              checked={show}
              onChange={handleShow}
              className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-gray-400 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-gray-500"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
              />
            </Switch>
          </div>
        ) : (
          <div className="border rounded-md border-gray-300 p-4 bg-gray-100"></div>
        )}
        <div className="mt-12 text-sm">
          <Link href="/">
            <h1 className="underline underline-offset-2 text-gray-500 hover:text-gray-400">
              Back to encryption page
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};
