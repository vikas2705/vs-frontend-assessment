import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const MergeNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Merge"
      description="Combine multiple inputs into a single output"
      fields={[
        {
          name: "method",
          type: "select",
          label: "Merge Method",
          defaultValue: "concat",
          options: [
            { value: "concat", label: "Concatenate" },
            { value: "zip", label: "Zip" },
            { value: "union", label: "Union" },
            { value: "intersection", label: "Intersection" },
          ],
        },
        {
          name: "maxInputs",
          type: "number",
          label: "Max Inputs",
          defaultValue: 3,
          min: 2,
          max: 10,
          step: 1,
        },
      ]}
      handles={[
        {
          type: "target",
          position: Position.Left,
          id: `${id}-input1`,
          style: { top: "25%" },
        },
        {
          type: "target",
          position: Position.Left,
          id: `${id}-input2`,
          style: { top: "50%" },
        },
        {
          type: "target",
          position: Position.Left,
          id: `${id}-input3`,
          style: { top: "75%" },
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
