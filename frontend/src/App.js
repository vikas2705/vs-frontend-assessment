import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-vs-dark-950 via-vs-dark-900 to-vs-dark-950">
      <header className="bg-vs-dark-900/80 backdrop-blur-sm border-b border-vs-purple-900/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-vs-purple-500 to-vs-purple-700 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">VS</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-vs-purple-400 to-vs-purple-600 bg-clip-text text-transparent">
              VectorShift Pipeline Builder
            </h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-6 py-6">
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
