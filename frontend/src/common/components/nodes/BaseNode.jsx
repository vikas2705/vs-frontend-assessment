import { useState, useEffect, useRef } from "react";
import { Handle } from "reactflow";
import { useStore } from "../../store/store";

const AutoResizeTextarea = ({
  value,
  onChange,
  placeholder,
  rows,
  minHeight,
  className,
  style,
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleChange = (e) => {
    onChange(e);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      onInput={handleChange}
      placeholder={placeholder}
      rows={rows || 3}
      className={className}
      style={{
        minHeight: minHeight || "60px",
        height: "auto",
        lineHeight: "1.4",
        ...style,
      }}
    />
  );
};

/**
 * BaseNode - A reusable node component that handles common functionality
 *
 * @param {Object} props
 * @param {string} props.id
 * @param {Object} props.data
 * @param {string} props.title
 * @param {Array} props.fields
 * @param {Array} props.handles - Static handles array
 * @param {Function} props.dynamicHandles - Function that receives (fieldValues, id) and returns handles array
 * @param {Function} props.dynamicStyle - Function that receives (fieldValues) and returns style object
 * @param {React.ReactNode} props.children
 * @param {string} props.description
 */
export const BaseNode = ({
  id,
  data,
  title,
  fields = [],
  handles = [],
  dynamicHandles,
  dynamicStyle,
  children,
  description,
}) => {
  const [fieldValues, setFieldValues] = useState(() => {
    const initial = {};
    fields.forEach((field) => {
      initial[field.name] = data?.[field.name] || field.defaultValue || "";
    });
    return initial;
  });

  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    Object.keys(fieldValues).forEach((fieldName) => {
      updateNodeField(id, fieldName, fieldValues[fieldName]);
    });
  }, [fieldValues, id, updateNodeField]);

  const handleFieldChange = (fieldName, value) => {
    setFieldValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const renderField = (field) => {
    const value = fieldValues[field.name] || "";

    switch (field.type) {
      case "text":
        return (
          <label key={field.name} className="block text-xs text-gray-300">
            {field.label}:
            <input
              type="text"
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className="w-full mt-1 px-2 py-1 bg-vs-dark-800/50 border border-vs-purple-700/50 rounded text-white text-xs focus:outline-none focus:border-vs-purple-500 focus:ring-1 focus:ring-vs-purple-500 nodrag"
            />
          </label>
        );

      case "textarea":
        const autoResize = field.autoResize !== false;

        if (autoResize) {
          return (
            <label key={field.name} className="block text-xs text-gray-300">
              {field.label}:
              <AutoResizeTextarea
                value={value}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                rows={field.rows || 3}
                minHeight={field.minHeight || "60px"}
                className="w-full mt-1 px-2 py-1 bg-vs-dark-800/50 border border-vs-purple-700/50 rounded text-white text-xs focus:outline-none focus:border-vs-purple-500 focus:ring-1 focus:ring-vs-purple-500 nodrag resize-none overflow-hidden"
              />
            </label>
          );
        } else {
          return (
            <label key={field.name} className="block text-xs text-gray-300">
              {field.label}:
              <textarea
                value={value}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                rows={field.rows || 3}
                className="w-full mt-1 px-2 py-1 bg-vs-dark-800/50 border border-vs-purple-700/50 rounded text-white text-xs focus:outline-none focus:border-vs-purple-500 focus:ring-1 focus:ring-vs-purple-500 nodrag resize-none"
              />
            </label>
          );
        }

      case "select":
        return (
          <label key={field.name} className="block text-xs text-gray-300">
            {field.label}:
            <select
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className="w-full mt-1 px-2 py-1 bg-vs-dark-800/50 border border-vs-purple-700/50 rounded text-white text-xs focus:outline-none focus:border-vs-purple-500 focus:ring-1 focus:ring-vs-purple-500 nodrag"
            >
              {field.options?.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-vs-dark-800"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        );

      case "number":
        return (
          <label key={field.name} className="block text-xs text-gray-300">
            {field.label}:
            <input
              type="number"
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              min={field.min}
              max={field.max}
              step={field.step}
              className="w-full mt-1 px-2 py-1 bg-vs-dark-800/50 border border-vs-purple-700/50 rounded text-white text-xs focus:outline-none focus:border-vs-purple-500 focus:ring-1 focus:ring-vs-purple-500 nodrag"
            />
          </label>
        );

      default:
        return null;
    }
  };

  const renderHandles = () => {
    const allHandles = [...handles];

    if (dynamicHandles && typeof dynamicHandles === "function") {
      const dynamic = dynamicHandles(fieldValues, id);
      if (Array.isArray(dynamic)) {
        allHandles.push(...dynamic);
      }
    }

    return allHandles.map((handle, index) => (
      <Handle
        key={`${handle.id || `${handle.type}-${index}`}`}
        type={handle.type}
        position={handle.position}
        id={handle.id || `${id}-${handle.type}-${index}`}
        style={handle.style}
        className="!bg-vs-purple-500 !border-2 !border-vs-purple-300 !w-3 !h-3"
      />
    ));
  };

  const nodeStyle =
    dynamicStyle && typeof dynamicStyle === "function"
      ? dynamicStyle(fieldValues)
      : {};

  return (
    <div
      className="min-w-[220px] bg-gradient-to-br from-vs-purple-900/80 to-vs-purple-800/80 border border-vs-purple-600/50 rounded-lg shadow-lg p-3"
      style={nodeStyle}
    >
      {renderHandles()}

      <div className="mb-2">
        <span className="text-vs-purple-200 font-semibold text-sm">
          {title}
        </span>
      </div>

      {description && (
        <div className="mb-2">
          <span className="text-gray-400 text-xs">{description}</span>
        </div>
      )}

      {children || (
        <div className="space-y-2">
          {fields.map((field) => renderField(field))}
        </div>
      )}
    </div>
  );
};
