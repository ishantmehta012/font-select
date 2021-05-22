import React from "react";
import Proptypes from "prop-types";
import { Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { API_STATUS } from "../../constants/Constants";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

// react-window codesandbox: https://codesandbox.io/s/3vnx878jk5?file=/index.js
const FontListItem = ({
  item,
  imageFolderPath,
  isLoading,
  isLoaded,
  style,
}) => {
  return (
    <div
      style={style}
      className="fontListItem h-10 flex items-center px-6 hover:bg-gray-100 cursor-pointer justify-between"
      data-fontid={item.name}
    >
      <div className="pr-24">
        <img
          className="h-8"
          src={`${imageFolderPath}/${item.name}.png`}
          alt={item.name}
        />
        {/*{item.name}*/}
      </div>
      <div>
        {isLoading ? <Icon icon={IconNames.CIRCLE} iconSize={20} /> : null}
        {isLoaded ? <Icon icon={IconNames.TICK} iconSize={20} /> : null}
      </div>
    </div>
  );
};

export const FontShape = Proptypes.shape({
  name: Proptypes.string,
  fontUrl: Proptypes.string,
});

FontListItem.prototypes = {
  item: FontShape,
  imageFolderPath: Proptypes.string,
  isLoading: Proptypes.bool,
  isLoaded: Proptypes.bool,
};

const Row = ({ index, style, data }) => {
  const item = data.fontList[index];
  return (
    <FontListItem
      style={style}
      key={item.name}
      item={item}
      imageFolderPath={data.imageFolderPath}
      isLoading={
        data.loadingState.name === item.name &&
        data.loadingState.status === API_STATUS.LOADING
      }
      isLoaded={
        data.loadingState.name === item.name &&
        data.loadingState.status === API_STATUS.SUCCESS
      }
    />
  );
};

const ListItems = ({ fontList, imageFolderPath, loadingState }) => (
  <AutoSizer>
    {({ height, width }) => {
      return (
        <List
          height={height}
          itemCount={fontList.length}
          itemSize={40} // h-10 2.5rem
          width={width}
          itemData={{
            fontList,
            imageFolderPath,
            loadingState,
          }}
        >
          {Row}
        </List>
      );
    }}
  </AutoSizer>
);

const FontList = ({
  fontList,
  onFontSelect,
  imageFolderPath,
  loadingState,
}) => {
  const handleClick = (e) => {
    const fontListElement = e.target.closest(".fontListItem");
    if (!fontListElement) return;
    const fontId = fontListElement.dataset.fontid;
    const selectedFont = fontList.find((font) => font.name === fontId);
    onFontSelect(selectedFont);
  };

  return (
    <div className="flex-1 pt-2 overflow-y-auto" onClick={handleClick}>
      {fontList.length ? (
        <ListItems
          fontList={fontList}
          imageFolderPath={imageFolderPath}
          loadingState={loadingState}
        />
      ) : (
        <div className="h-10 flex items-center px-6 justify-between">
          No fonts matched your query
        </div>
      )}
    </div>
  );
};

FontList.propTypes = {
  fontList: Proptypes.arrayOf(FontShape),
  onFontSelect: Proptypes.func,
  imageFolderPath: Proptypes.string,
};

export default FontList;
