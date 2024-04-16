import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [lenPassword, setLenPassword] = useState("10");
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [newPassword, setNewPass] = useState("");

  // useCallback hook for optimization not mandatory, we can also use normal function.
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllow) alphabet += "1234567890";
    if (charAllow) alphabet += '!@#$%^&*()_+:"{}|?><';

    for (let i = 1; i <= lenPassword; i++) {
      let randomNum = Math.floor(Math.random() * alphabet.length + 1);
      pass += alphabet.charAt(randomNum);
    }
    setNewPass(pass);
  }, [lenPassword, numAllow, charAllow, setNewPass]);

  useEffect(() => {
    passwordGenerator();
  }, [lenPassword, numAllow, charAllow, passwordGenerator]);

  // useRef is for UI text selection effect
  const passRef = useRef(null);
  // For optimization purpose we using useCallback hook without that we can also use normal function
  const copyPasswordToClipboard = useCallback(() => {
    passRef.current.select();

    //? --- If you want to select a particular range and copy to clipboard ---
    // passRef?.current.setSelectionRange(0, 3)
    // window.navigator.clipboard.writeText(passRef.current.value.substring(0, 3))
    // ----------------------------------------------------

    window.navigator.clipboard.writeText(newPassword);
  }, [newPassword]);

  return (
    <div className="flex justify-center align-middle mt-10">
      <div className="w-[500px] px-4">
        <h1 className="text-center font-semibold text-4xl mb-5">
          Password Generator
        </h1>
        <div className="flex rounded-lg overflow-hidden text-lg">
          <input
            type="text"
            placeholder="Generated Password..."
            className="w-full py-1 px-3 text-blue-700 outline-none font-bold"
            readOnly
            value={newPassword}
            ref={passRef}
          />
          <button
            className="bg-blue-700 px-3 pb-1 hover:bg-blue-600"
            onClick={copyPasswordToClipboard}
          >
            copy
          </button>
        </div>

        <div className="flex justify-center align-middle gap-5 mt-3">
          <div className="flex justify-center align-middle gap-2">
            <input
              type="range"
              name="range"
              id="lenSlider"
              min="8"
              max="25"
              className="cursor-pointer"
              value={lenPassword}
              onChange={(e) => setLenPassword(e.target.value)}
            />
            <label htmlFor="lenSlider" className="min-w-20">
              Length({lenPassword})
            </label>
          </div>
          <div className="flex justify-center align-middle gap-1">
            <input
              type="checkbox"
              id="numBox"
              className="scale-150"
              onClick={() => {
                setNumAllow((prev) => !prev);
              }}
            />
            <label htmlFor="numBox">Numbers</label>
          </div>
          <div className="flex justify-center align-middle gap-1">
            <input
              type="checkbox"
              id="charBox"
              className="scale-150"
              onChange={() => {
                setCharAllow((prev) => !prev);
              }}
            />
            <label htmlFor="charBox">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
