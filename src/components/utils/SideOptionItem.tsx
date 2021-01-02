import React from "react";
import cx from "classnames";
import { Collapse } from "@chakra-ui/react";

const SideOptionItem: React.FC = () => {
  return (
    <div
      className={cx(
        "cursor-pointer group break-normal flex px-2 py-2 my-1 rounded-lg group-hover flex-col mb-2"
      )}
    >
      <div className="flex flex-row justify-between items-center group-hover">
        <h1
          className={cx(
            "text-gray-600 text-md font-semibold md-bock font-mono"
          )}
        >
          Add buildings
        </h1>
      </div>
    </div>
  );
};

export default SideOptionItem;
