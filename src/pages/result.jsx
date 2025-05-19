import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/result.css';
import Profile from '../Components/profile';

function Result() {
  const [outputValue, setOutputValue] = useState('');
  const [output, setOutput] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/result');
        setOutputValue(response.data.transcription);
        setOutput(response.data.transcription);
      } catch (error) {
        console.error("Error fetching result:", error);
      }
    };
    fetchData();
  }, []);

  function handleChange(e) {
    setOutput(e.target.value);
  }

  // Helper function for typewriter effect
  const typewriterEffect = (text) => {
    setChatbotResponse(''); // Clear the field before animation
    const words = text.split(' ');
    let currentText = '';
    words.forEach((word, index) => {
      setTimeout(() => {
        currentText += (index === 0 ? '' : ' ') + word;
        setChatbotResponse(currentText);
      }, index * 150); // 150ms delay for each word
    });
  };

  async function retrieveAns() {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/chatbot', { question: output });

      if (response.data && response.data.answer) {
        typewriterEffect(response.data.answer);
        setError('');
      } else {
        throw new Error('Bot did not return a valid response.');
      }
    } catch (err) {
      setError('❌ Failed to connect to the chatbot. Please try again.');
      setChatbotResponse('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-start h-100 p-4 w-100 bg-gradient-to-br from-[#0A2E3A] to-[#0D4C5C]">
      
      {/* Profile Section */}
      <div className="w-100 p-0 mb-4">
        <Profile />
      </div>

      {/* Main Content */}
      <div 
        className="glass-card shadow-lg p-5 w-100 mt-4" 
        style={{
          maxWidth: '1000px',
          borderRadius: '15px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
        }}
      >
        <h2 className="text-center mb-4 text-white">
          {loading ? "Analyzing..." : "Transcription and  Response"}
        </h2>

        <div className="row">
          {/* Left Section: Speech Transcription */}
          <div className="col-md-6 mb-4">
            <h5 className="text-white">Transcription Text</h5>
            <div className="form-group">
              <textarea
                value={output}
                onChange={handleChange}
                className="form-control mb-3 p-3 glass-input"
                rows="6"
                placeholder="Transcription will appear here..."
                style={{
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  fontSize: '16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(5px)',
                  color: '#fff',
                  transition: '0.3s'
                }}
              />
            </div>
          </div>

          {/* Right Section: Chatbot Response */}
          <div className="col-md-6 mb-4">
            <h5 className="text-white">Medical Result</h5>
            <div className="form-group">
              <textarea
                value={loading ? "Loading..." : (chatbotResponse || error)}
                readOnly
                className="form-control mb-3 p-3 glass-input"
                rows="6"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backdropFilter: 'blur(5px)',
                  color: '#fff',
                  transition: '0.3s'
                }}
                placeholder="Chatbot answer will appear here..."
              />
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="text-center mb-3">
          <button
            className={`btn px-5 py-3 rounded-pill ${loading ? 'disabled' : ''}`}
            onClick={retrieveAns}
            disabled={loading}
            style={{
              fontSize: '16px',
              background: 'linear-gradient(135deg, #00B4DB, #0083B0)',
              color: '#fff',
              border: 'none',
              transition: '0.3s',
              boxShadow: loading ? 'none' : '0px 6px 15px rgba(0, 0, 0, 0.2)',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? (
              "generating"
            ) : (
              "Generate"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
