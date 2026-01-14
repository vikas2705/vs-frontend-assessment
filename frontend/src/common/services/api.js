const BACKEND_URL = 'http://localhost:8000';

export const parsePipeline = async (nodes, edges) => {
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

        return response.json();
    } catch (error) {
        console.error('Error parsing pipeline:', error);
        throw error;
    }
};
