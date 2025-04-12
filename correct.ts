import { GoogleGenerativeAI } from '@google/generative-ai';
import { useState, useEffect } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableModels, setAvailableModels] = useState([]);
  
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // Fetch available models on component mount
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const response = await genAI.listModels();
        setAvailableModels(response.models);
        console.log("Available models:", response.models);
      } catch (err) {
        console.error("Error fetching models:", err);
      }
    };
    
    fetchModels();
  }, [API_KEY]);

  const handleInput = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      
      // Using the most current stable model configuration
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-pro-latest", // Most current recommended model
      });
      
      const result = await model.generateContent(input);
      const response = await result.response;
      setOutput(response.text());
    } catch (err) {
      console.error('API Error:', err);
      setError(`Error: ${err.message}. Available models: ${availableModels.map(m => m.name).join(', ')}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-2xl">
        {/* Output Display */}
        {output && (
          <div className="mb-4 p-4 bg-gray-100 rounded-lg">
            <p className="whitespace-pre-wrap">{output}</p>
          </div>
        )}
        
        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
            {error.includes('Available models') ? (
              <>
                <p>Model error. Try one of these available models:</p>
                <ul className="list-disc pl-5 mt-2">
                  {availableModels.map(model => (
                    <li key={model.name}>{model.name}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>{error}</p>
            )}
          </div>
        )}

        {/* Input Area */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask me something..."
            className="flex-1 p-3 border rounded-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleInput()}
            disabled={loading}
          />
          <button
            className="bg-blue-600 text-white px-4 py-3 rounded-lg disabled:bg-gray-400"
            onClick={handleInput}
            disabled={loading || !input.trim()}
          >
            {loading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;