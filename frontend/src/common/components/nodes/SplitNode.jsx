import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const SplitNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Split"
      description="Split data into multiple outputs"
      fields={[
        {
          name: "method",
          type: "select",
          label: "Split Method",
          defaultValue: "delimiter",
          options: [
            { value: "delimiter", label: "By Delimiter" },
            { value: "length", label: "By Length" },
            { value: "regex", label: "By Regex" },
            { value: "chunks", label: "Into Chunks" },
          ],
        },
        {
          name: "delimiter",
          type: "text",
          label: "Delimiter",
          defaultValue: ",",
          placeholder: "Split delimiter",
        },
        {
          name: "maxOutputs",
          type: "number",
          label: "Max Outputs",
          defaultValue: 3,
          min: 1,
          max: 10,
          step: 1,
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
          id: `${id}-output1`,
          style: { top: "25%" },
        },
        {
          type: "source",
          position: Position.Right,
          id: `${id}-output2`,
          style: { top: "50%" },
        },
        {
          type: "source",
          position: Position.Right,
          id: `${id}-output3`,
          style: { top: "75%" },
        },
      ]}
    />
  );
};
