import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const TransformNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      description="Apply transformations to data"
      fields={[
        {
          name: "transformation",
          type: "textarea",
          label: "Transformation",
          defaultValue: "{{input}}",
          placeholder: "Enter transformation logic or template",
          rows: 4,
        },
        {
          name: "type",
          type: "select",
          label: "Type",
          defaultValue: "template",
          options: [
            { value: "template", label: "Template" },
            { value: "function", label: "Function" },
            { value: "regex", label: "Regex" },
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
          id: `${id}-output`,
        },
      ]}
    />
  );
};
