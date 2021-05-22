import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

// https://www.freecodecamp.org/news/javascript-debounce-example/
// function debounce(func, timeout = 300) {
//   let timer;
//   return (...args) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       func.apply(this, args);
//     }, timeout);
//   };
// }

const SearchInput = ({ query, onChange }) => {
  const onChangeInputValue = (e) => onChange(e.target.value);
  // const onChangeInputValue = debounce((e) => onChange(e.target.value), 200);
  return (
    <div className="pt-4 px-6">
      <div className="flex items-center pl-3 rounded h-10 border border-gray-300">
        <Icon icon={IconNames.SEARCH} iconSize={20} />
        <input
          autoFocus
          defaultValue={query}
          onChange={onChangeInputValue}
          className="h-10 border-0 py-0 px-3 bg-transparent w-full focus:outline-none"
        />
      </div>
    </div>
  );
};

SearchInput.propTypes = {
  query: PropTypes.string,
  onChange: PropTypes.func,
};

SearchInput.defaultProps = {
  query: "",
  onChange: () => {},
};

export default SearchInput;
