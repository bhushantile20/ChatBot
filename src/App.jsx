import { useState, useRef, useEffect } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([
    {
      userText: "what is hydrophonic farming",
      aiText: `Hydroponic farming is a method of growing plants without soil, using water-based nutrient solutions. Here's a breakdown of what that means and the different aspects of it:

**Key Features of Hydroponics:**
* **Soilless Medium (or No Medium):** Plants are grown without traditional soil. Roots are suspended in water, or supported by an inert medium like perlite, vermiculite, coco coir, rockwool, or clay pebbles. These mediums primarily provide support and aeration, not nutrients.
* **Nutrient-Rich Solution:** The roots are supplied with a carefully balanced solution of water and essential nutrients (nitrogen, phosphorus, potassium, and micronutrients) tailored to the specific plant's needs.
* **Controlled Environment:** Hydroponic systems often operate in controlled environments, like greenhouses or indoor farms. This allows for precise control over temperature, humidity, light, and other factors, optimizing plant growth and yields.
* **Water Conservation:** Hydroponics can significantly reduce water usage compared to traditional agriculture. Water is often recirculated within the system, minimizing waste.
* **Space Efficiency:** Plants can be grown closer together in hydroponic systems, making it possible to produce more food in a smaller area.
* **Faster Growth:** With optimal nutrient delivery and environmental control, hydroponically grown plants often grow faster than soil-based plants.
* **Reduced Pest and Disease:** Since there's no soil, there are fewer soil-borne pests and diseases to contend with. However, good hygiene and pest management are still important.

**Common Hydroponic Systems:**
* **Deep Water Culture (DWC):** Plant roots are submerged in an aerated nutrient solution. An air stone provides oxygen to the roots.
* **Nutrient Film Technique (NFT):** A shallow stream of nutrient solution continuously flows over the roots.
* **Ebb and Flow (Flood and Drain):** The growing tray is periodically flooded with nutrient solution, then drained back into the reservoir.
* **Drip Systems:** Nutrient solution is slowly dripped onto the base of each plant.
* **Aeroponics:** Plant roots are suspended in the air and periodically sprayed with nutrient solution. This provides excellent oxygenation.`
    }
  ]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl flex-1 overflow-y-auto mb-4 space-y-4">
        {chat.map((val, i) => (
          <div key={i} className="space-y-2">
            <div className="bg-white p-3 rounded-lg shadow">
              <p className="font-medium">You:</p>
              <p>{val.userText}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg shadow">
              <p className="font-medium text-blue-600">AI:</p>
              <div className="prose">
                {val.aiText.split('\n').map((paragraph, idx) => (
                  <p 
                    key={idx} 
                    className={!paragraph.startsWith('*') && !paragraph.startsWith('**') ? 'text-gray-800' : ''}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="w-full max-w-2xl bg-white p-3 rounded-lg shadow-lg sticky bottom-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask me Something"
            className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Send
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;