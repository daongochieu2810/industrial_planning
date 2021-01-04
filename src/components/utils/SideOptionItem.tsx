import React, { Dispatch, SetStateAction, useState } from "react";
import cx from "classnames";
import { Collapse, Divider } from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Option from "./Option";
import ModeOption from "./ModeOption";

export interface SideOptionItemProps {
  option: Option;
  selectedSubOption: Option;
  setSelectedSubOption: Dispatch<SetStateAction<Option>>;
}

const SideOptionItem: React.FC<SideOptionItemProps> = ({
  option,
  selectedSubOption,
  setSelectedSubOption,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubOptions = option.subOptions.length > 0;
  const onClickHandler = () => {
    if (hasSubOptions) {
      setIsExpanded(!isExpanded);
    }
  };
  return (
    <div
      className={cx(
        "cursor-pointer group break-normal flex px-2 py-2 my-1 rounded-lg group-hover flex-col mb-2"
      )}
    >
      <div
        className="flex flex-row justify-between items-center group-hover"
        onClick={onClickHandler}
      >
        <h1
          className={cx(
            "text-gray-600 text-md font-semibold md-bock font-mono"
          )}
        >
          {option.itemName}
        </h1>
        {hasSubOptions && !isExpanded && <FiChevronDown size={10} />}
        {hasSubOptions && isExpanded && <FiChevronUp size={10} />}
      </div>
      {hasSubOptions && (
        <Collapse in={isExpanded} animateOpacity>
          <div className="flex flex-col">
            {option.subOptions.map((item) => {
              const isSelected: boolean =
                selectedSubOption && item.id === selectedSubOption.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedSubOption(item);
                  }}
                >
                  <h1
                    className={cx(
                      "text-gray-600 text-xs font-mono md-block py-4 hover:text-green-400",
                      {
                        "text-green-500 font-mono": isSelected,
                      }
                    )}
                  >
                    {item.itemName}
                  </h1>
                </div>
              );
            })}
          </div>
        </Collapse>
      )}
    </div>
  );
};

export default SideOptionItem;
