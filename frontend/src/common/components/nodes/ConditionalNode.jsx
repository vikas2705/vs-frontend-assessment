import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const ConditionalNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Conditional"
      description="Route data based on conditions"
      fields={[
        {
          name: "condition",
          type: "textarea",
          label: "Condition",
          defaultValue: "{{input}} > 0",
          placeholder: "Enter condition expression",
          rows: 3,
        },
        {
          name: "operator",
          type: "select",
          label: "Operator",
          defaultValue: "javascript",
          options: [
            { value: "javascript", label: "JavaScript" },
            { value: "python", label: "Python" },
            { value: "jsonpath", label: "JSONPath" },
          ],
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
          id: `${id}-true`,
          style: { top: "30%" },
        },
        {
          type: "source",
          position: Position.Right,
          id: `${id}-false`,
          style: { top: "70%" },
        },
      ]}
    />
  );
};
