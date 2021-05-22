import React from "react";
import Proptypes from "prop-types";
import SearchInput from "../SearchInput";
import FontList, { FontShape } from "../FontList";
import { API_STATUS } from "../../constants/Constants";
import processedData from "./processed-data.json";

const FontSelect = ({
  onInputChange,
  onFontSelect,
  onFontLoaded,
  onFontLoadError,
  imageFolderPath,
}) => {
  const fontList = processedData;
  const [searchInput, setSearchInput] = React.useState("Roboto");
  const filteredFontList = searchInput
    ? fontList.filter(
        (font) =>
          font.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
          font.name?.toLowerCase().includes(searchInput.toLowerCase())
      )
    : fontList;
  const [loadingState, setLoadingState] = React.useState({
    name: "",
    status: "",
  });

  const handleInputChange = (input) => {
    setSearchInput(input);
    onInputChange(input);
  };

  const handleFontSelect = async (selectedFont) => {
    setLoadingState({ name: "", status: "" });
    const name = selectedFont.name;
    const fontName = selectedFont.name;
    // check if document already has font
    if (document.fonts.check(`0 "${fontName}"`)) {
      // Already loaded font ...
      const fontFaceObj = [...document.fonts].find((f) => f.family === name);
      // Use if, fue to issue with Mukta Light font
      if (fontFaceObj) {
        onFontSelect(selectedFont);
        onFontLoaded(fontFaceObj);
        setLoadingState({ name, status: API_STATUS.SUCCESS });
        return;
      }
    }

    // Set loading state
    setLoadingState({ name, status: API_STATUS.LOADING });
    onFontSelect(selectedFont);

    // Fetch a font face
    const font = new FontFace(
      fontName,
      `url(${selectedFont.fontUrl})`,
      // "url(https://pdfmake-fonts.s3-us-west-2.amazonaws.com/Ranchers/Ranchers-Regular.ttf)",
      {
        style: "normal",
        weight: 400,
      }
    );

    try {
      // Fired the call ...
      const fontFaceObj = await font.load();

      // Add font to the Font Face Set
      document.fonts.add(fontFaceObj);

      onFontLoaded(fontFaceObj);
      setLoadingState({ name, status: API_STATUS.SUCCESS });
    } catch (error) {
      onFontLoadError({ error, font: selectedFont });
      setLoadingState({ name: "", status: "" });
    }
  };

  return (
    <div className="flex flex-col	h-full">
      <SearchInput query={searchInput} onChange={handleInputChange} />
      <FontList
        fontList={filteredFontList}
        onFontSelect={handleFontSelect}
        imageFolderPath={imageFolderPath}
        loadingState={loadingState}
      />
    </div>
  );
};

FontSelect.prototypes = {
  imageFolderPath: Proptypes.string,
  onFontSelect: Proptypes.func,
  onFontLoaded: Proptypes.func,
  onFontLoadError: Proptypes.func,
  onInputChange: Proptypes.func,
  selectedFont: FontShape,
};

const noop = () => {};

FontSelect.defaultProps = {
  imageFolderPath: "https://img-font-images.s3-us-west-2.amazonaws.com",
  onFontSelect: noop,
  onFontLoaded: noop,
  onFontLoadError: noop,
  onInputChange: noop,
  selectedFont: null,
};

export default FontSelect;
