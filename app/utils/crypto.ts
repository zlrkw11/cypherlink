export async function encryptMessage(message: string, password: string) {
  const enc = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const keyMaterial = await getKeyMaterial(password);
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: iv, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );
  const encodedMessage = enc.encode(message);
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encodedMessage
  );

  return {
    iv: Array.from(iv),
    ciphertext: Array.from(new Uint8Array(ciphertext)),
  };
}

async function getKeyMaterial(password: string) {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
}

export async function decryptMessage(
  encrypted: { iv: number[]; ciphertext: number[] },
  password: string
): Promise<string> {
  const enc = new TextEncoder();
  const dec = new TextDecoder();
  const iv = new Uint8Array(encrypted.iv);
  const ciphertext = new Uint8Array(encrypted.ciphertext);
  const keyMaterial = await getKeyMaterial(password);

  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: iv, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext
  );

  return dec.decode(decrypted);
}
