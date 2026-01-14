import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const FilterNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      description="Filter data based on conditions"
      fields={[
        {
          name: "field",
          type: "text",
          label: "Field",
          defaultValue: "",
          placeholder: "Field to filter",
        },
        {
          name: "operator",
          type: "select",
          label: "Operator",
          defaultValue: "equals",
          options: [
            { value: "equals", label: "Equals" },
            { value: "contains", label: "Contains" },
            { value: "greater", label: "Greater Than" },
            { value: "less", label: "Less Than" },
          ],
        },
        {
          name: "value",
          type: "text",
          label: "Value",
          defaultValue: "",
          placeholder: "Filter value",
        },
      ]}
      handles={[
        {
          type: "target",
          position: Position.Left,
          id: `${id}-input`,
        },
        {
          type: "source",
          position: Position.Right,
          id: `${id}-output`,
        },
      ]}
    />
  );
};
