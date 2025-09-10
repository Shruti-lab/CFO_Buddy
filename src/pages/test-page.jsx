import React from 'react';

const TestPage = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg m-8">
      <h1 className="text-2xl font-bold mb-4">Test Page Works!</h1>
      <p>If you're seeing this, routing is working properly.</p>
      <div className="mt-4">
        <a href="/cfo_buddy/" className="text-blue-500 hover:underline">Go to Home</a>
      </div>
    </div>
  );
};

export default TestPage;
