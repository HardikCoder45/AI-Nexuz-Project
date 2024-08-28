import React from 'react'

export default function Pricing() {
  return (
    <div>
      <div
      className="min-h-screen bg-cover bg-center"
     
    >
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-800 bg-opacity-75">
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
          {/* Free Tier */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Free Tier</h2>
            <p className="text-gray-600 mb-4">150 requests per month</p>
            <p className="text-gray-600 mb-4">Stable Diffusion & RunwayML</p>
            <p className="text-gray-600 mb-4">No credit required</p>
          </div>

          {/* DALLE-3 */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">DALLE-3</h2>
            <p className="text-gray-600 mb-4">5 credits per request</p>
            <p className="text-gray-600 mb-4">$0.05 per request</p>
            <p className="text-gray-600 mb-4">Minimum 500 credits purchase</p>
          </div>

          {/* DALLE-2 */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">DALLE-2</h2>
            <p className="text-gray-600 mb-4">3 credits per request</p>
            <p className="text-gray-600 mb-4">$0.03 per request</p>
            <p className="text-gray-600 mb-4">Minimum 500 credits purchase</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
