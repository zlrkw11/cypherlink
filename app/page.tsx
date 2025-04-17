export default function Home() {
  return (
    <div className="flex flex-col h-screen items-center justify-center gap-2">
      <h1 className="m-2">Encrypt a message</h1>
      <input
        type="text"
        placeholder="enter your message..."
        className="border border-gray-800 rounded-md p-2"
      />
      <button className="bg-blue-500 text-gray-100 rounded-md p-2 hover:bg-blue-300 cursor-pointer">
        generate
      </button>
    </div>
  );
}
