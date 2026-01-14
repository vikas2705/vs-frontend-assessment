import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const OutputNode = ({ id, data }) => {
  const defaultName = id.replace("customOutput-", "output_");

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      fields={[
        {
          name: "outputName",
          type: "text",
          label: "Name",
          defaultValue: defaultName,
          placeholder: "Enter output name",
        },
        {
          name: "outputType",
          type: "select",
          label: "Type",
          defaultValue: "Text",
          options: [
            { value: "Text", label: "Text" },
            { value: "Image", label: "Image" },
          ],
        },
      ]}
      handles={[
        {
          type: "target",
          position: Position.Left,
          id: `${id}-value`,
        },
      ]}
    />
  );
};
