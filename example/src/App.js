import React from 'react'

import { FontSelector } from 'font-select'
import 'font-select/dist/index.css'

const App = () => {
  const [input, setInput] = React.useState("Initial Text");
  const [loading, setIsLoading] = React.useState(false);
  const [loaded, setIsLoaded] = React.useState(false);
  const [fontLoadError, setFontLoadError] = React.useState("");
  const [fontLoadSuccessMessage, setFontLoadSuccessMessage] = React.useState(
    "Select a font and see Magic"
  );

  const handleFontSelect = () => {
    setFontLoadError("");
    setFontLoadSuccessMessage("Wait, I am loading the font");
    setIsLoading(true);
    setIsLoaded(false);
  };
  const handleFontLoaded = (fontFaceObj) => {
    setFontLoadError("");
    setIsLoading(false);
    setIsLoaded(true);
    const infoElement = document.getElementsByClassName("infoElement")[0];
    infoElement.style.fontFamily = fontFaceObj.family;
    setFontLoadSuccessMessage(`"${fontFaceObj.family}" applied successfully`);
  };

  const handleFontLoadError = ({ error, font }) => {
    setFontLoadError(`"${font.name}" failed to load.\nError is: ${error}`);
    setFontLoadSuccessMessage("");
  };

  return (
    <div className="bg-gray-100 flex">
      <div className="h-screen bg-white w-96">
        <FontSelector
          imageFolderPath="https://img-font-images.s3-us-west-2.amazonaws.com"
          onFontSelect={handleFontSelect}
          onFontLoaded={handleFontLoaded}
          onFontLoadError={handleFontLoadError}
          onInputChange={setInput}
        />
      </div>
      <div className="infoElement pl-4">
        <div className="pt-4">{input}</div>
        <div className="pt-4">{`Loading - ${loading}`}</div>
        <div className="pt-4">{`Loaded - ${loaded}`}</div>
        {fontLoadError ? (
          <div className="pt-6 whitespace-pre-wrap text-red-500">
            {fontLoadError}
          </div>
        ) : null}
        {fontLoadSuccessMessage ? (
          <div className="pt-6 whitespace-pre-wrap text-green-500">
            {fontLoadSuccessMessage}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App
