import { useState } from "react";
import "./App.css";

//! In file I Generate password with all functionality ref-'App.jsx' with single 'useState' hook and tried to work least using react hook and mainly work in core javascript *** And Finally I Achieve almost same functionality ***

function CoreJs() {
  let minPasswordLength = 10;
  let [lenPassword, setLenPassword] = useState(minPasswordLength);
  let [numAllow, setNumAllow] = useState(false);
  let [charAllow, setCharAllow] = useState(false);
  let newPassword = "";

  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  function passGenerator() {
    for (let i = 1; i <= lenPassword; i++) {
      let randomNum = Math.floor(Math.random() * alphabet.length + 1);
      newPassword += alphabet.charAt(randomNum);
    }
  }

  if (numAllow == true && charAllow == true) {
    alphabet += '!@#$%^&*()_+:"{}|?><1234567890';
    passGenerator();
  } else if (numAllow == true) {
    alphabet += "1234567890";
    passGenerator();
  } else if (charAllow == true) {
    alphabet += '!@#$%^&*()_+:"{}|?><';
    passGenerator();
  } else {
    passGenerator();
  }

  function copyPasswordToClipboard() {
    window.navigator.clipboard.writeText(newPassword)
  }

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
            value={newPassword}
            readOnly
          />
          <button className="bg-blue-700 px-3 pb-1 hover:bg-blue-600" onClick={copyPasswordToClipboard}>copy</button>
        </div>

        <div className="flex justify-center align-middle gap-5 mt-3">
          <div className="flex justify-center align-middle gap-2">
            <input
              type="range"
              name="range"
              id="lenSlider"
              min="8"
              max="25"
              value={lenPassword}
              onChange={(e) => {
                setLenPassword(e.target.value);
              }}
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
              onClick={(e) => {
                setNumAllow(e.target.checked);
              }}
            />
            <label htmlFor="numBox">Numbers</label>
          </div>
          <div className="flex justify-center align-middle gap-1">
            <input
              type="checkbox"
              id="charBox"
              className="scale-150"
              onClick={(e) => {
                setCharAllow(e.target.checked);
              }}
            />
            <label htmlFor="charBox">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoreJs;
