import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [language, setLanguage] = useState('python');
  const [task, setTask] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!task.trim()) return;
    setLoading(true);
    setCode('');
    try {
      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, task }),
      });
      const data = await response.json();
      setCode(data.code);
    } catch (err) {
      setCode('// Error generating code. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-purple-400 mb-4">CodeCraft AI</h1>

      <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-3xl">
        <label className="block mb-2 text-sm">Select Language</label>
        <select
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="c++">C++</option>
          <option value="c#">C#</option>
        </select>

        <label className="block mb-2 text-sm">Describe your task</label>
        <textarea
          className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700"
          rows="4"
          placeholder="e.g. Create a REST API for a todo app"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        ></textarea>

        <button
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded font-semibold"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Code'}
        </button>
      </div>

      <div className="mt-6 w-full max-w-3xl">
        <label className="block mb-2 text-sm">Generated Code:</label>
        <pre className="bg-gray-900 p-4 rounded-xl whitespace-pre-wrap border border-gray-800 text-green-300 overflow-x-auto">
          {code || '// Your generated code will appear here'}
        </pre>
      </div>
    </div>
  );
};

export default App;