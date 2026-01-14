import { useStore } from '../store/store';
import { shallow } from 'zustand/shallow';

const BACKEND_URL = 'http://localhost:8000';

export const SubmitButton = () => {
    const { nodes, edges } = useStore(
        (state) => ({
            nodes: state.nodes,
            edges: state.edges,
        }),
        shallow
    );

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nodes: nodes,
                    edges: edges,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const dagStatus = data.is_dag ? 'Yes' : 'No';
            const message = `Pipeline Analysis Results:\n\n` +
                          `Number of Nodes: ${data.num_nodes}\n` +
                          `Number of Edges: ${data.num_edge}\n` +
                          `Is DAG: ${dagStatus}`;
            
            alert(message);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert(`Error submitting pipeline: ${error.message}\n\nMake sure the backend is running on ${BACKEND_URL}`);
        }
    };

    return (
        <div className="flex items-center justify-center py-6">
            <button 
                type="button" 
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-to-r from-vs-purple-600 to-vs-purple-700 hover:from-vs-purple-500 hover:to-vs-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-vs-purple-900/50 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-vs-purple-500 focus:ring-offset-2 focus:ring-offset-vs-dark-950"
            >
                Submit Pipeline
            </button>
        </div>
    );
}
