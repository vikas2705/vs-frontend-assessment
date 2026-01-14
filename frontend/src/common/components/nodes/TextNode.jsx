import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

const isValidVariableName = (name) => {
  if (!name || name.trim().length === 0) return false;
  const trimmed = name.trim();
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(trimmed);
};

const extractVariables = (text) => {
  if (!text) return [];

  const regex = /\{\{\s*([^}]+?)\s*\}\}/g;
  const matches = [];
  let match;

  regex.lastIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    const variableName = match[1].trim();
    if (isValidVariableName(variableName)) {
      if (!matches.includes(variableName)) {
        matches.push(variableName);
      }
    }
  }

  return matches;
};

const calculateNodeDimensions = (text, variables) => {
  const minWidth = 220;
  const minHeight = 120;
  const padding = 24;
  const headerHeight = 40;
  const labelHeight = 20;
  const spacing = 16;
  const charWidth = 7;

  const lines = text.split("\n");
  const longestLine = Math.max(...lines.map((line) => line.length), 10);
  const numLines = lines.length || 1;

  const maxWidth = 500;
  const estimatedContentWidth = longestLine * charWidth + padding;
  const contentWidth = Math.min(
    Math.max(estimatedContentWidth, minWidth),
    maxWidth
  );

  const lineHeight = 22;
  const estimatedTextHeight = numLines * lineHeight;
  const handlesHeight =
    variables.length > 0 ? Math.max(variables.length * 35, 50) : 0;
  const contentHeight = Math.max(
    estimatedTextHeight + headerHeight + labelHeight + spacing + handlesHeight,
    minHeight
  );

  return { width: contentWidth, height: contentHeight };
};

export const TextNode = ({ id, data }) => {
  const getDynamicHandles = (fieldValues, nodeId) => {
    const text = fieldValues.text || "";
    const variables = extractVariables(text);

    return variables.map((variable, index) => {
      const minHandleSpacing = 35;
      const startOffset = 50;
      const handleTop = startOffset + index * minHandleSpacing;

      return {
        type: "target",
        position: Position.Left,
        id: `${nodeId}-input-${variable}`,
        style: {
          top: `${handleTop}px`,
        },
      };
    });
  };

  const getDynamicStyle = (fieldValues) => {
    const text = fieldValues.text || "";
    const variables = extractVariables(text);
    const dimensions = calculateNodeDimensions(text, variables);

    return {
      minWidth: `${dimensions.width}px`,
      width: `${dimensions.width}px`,
      minHeight: `${dimensions.height}px`,
      height: "auto",
    };
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      fields={[
        {
          name: "text",
          type: "textarea",
          label: "Text",
          defaultValue: "{{input}}",
          placeholder: "Enter text or template (e.g., {{variableName}})",
          autoResize: true,
          minHeight: "60px",
        },
      ]}
      handles={[
        {
          type: "source",
          position: Position.Right,
          id: `${id}-output`,
        },
      ]}
      dynamicHandles={getDynamicHandles}
      dynamicStyle={getDynamicStyle}
    />
  );
};
