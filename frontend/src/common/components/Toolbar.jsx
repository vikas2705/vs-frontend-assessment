import { DraggableNode } from './DraggableNode.jsx';

export const PipelineToolbar = () => {

    return (
        <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">Node Components</h2>
            <div className="flex flex-wrap gap-4">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='split' label='Split' />
                <DraggableNode type='merge' label='Merge' />
                <DraggableNode type='conditional' label='Conditional' />
            </div>
        </div>
    );
};
