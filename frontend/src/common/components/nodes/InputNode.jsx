import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const InputNode = ({ id, data }) => {
  const defaultName = id.replace("customInput-", "input_");

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      fields={[
        {
          name: "inputName",
          type: "text",
          label: "Name",
          defaultValue: defaultName,
          placeholder: "Enter input name",
        },
        {
          name: "inputType",
          type: "select",
          label: "Type",
          defaultValue: "Text",
          options: [
            { value: "Text", label: "Text" },
            { value: "File", label: "File" },
          ],
        },
      ]}
      handles={[
        {
          type: "source",
          position: Position.Right,
          id: `${id}-value`,
        },
      ]}
    />
  );
};
