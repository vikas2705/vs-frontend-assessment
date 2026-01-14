export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        className="cursor-grab active:cursor-grabbing min-w-[120px] h-16 flex items-center justify-center flex-col rounded-lg bg-gradient-to-br from-vs-purple-900/50 to-vs-purple-800/50 border border-vs-purple-700/50 hover:border-vs-purple-500 hover:from-vs-purple-800/60 hover:to-vs-purple-700/60 transition-all duration-200 shadow-lg hover:shadow-vs-purple-900/50 hover:scale-105"
        draggable
      >
          <span className="text-white font-medium text-sm">{label}</span>
      </div>
    );
  };
  