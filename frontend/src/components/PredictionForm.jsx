import React, { useState } from "react";
// import axios from "axios";

const PredictionForm = () => {
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [enteredKM, setEnteredKM] = useState("");
    const [selectedFuel, setSelectedFuel] = useState("Petrol");
    const [selectedSellerType, setSelectedSellerType] = useState("Individual");
    const [selectedTransmission, setSelectedTransmission] = useState("Manual");
    const [selectedOwner, setSelectedOwner] = useState("0");
    const [enteredPrice, setEnteredPrice] = useState("");
    const [predictedPrice, setPredictedPrice] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:5000/predict", {
                brand: selectedBrand,
                year: selectedYear,
                km_driven: enteredKM,
                fuel: selectedFuel,
                seller_type: selectedSellerType,
                transmission: selectedTransmission,
                owner: selectedOwner,
                present_price: enteredPrice
            });
            setPredictedPrice(response.data.predicted_price);
            setError("");
        } catch (error) {
            setError(error.response?.data?.error || "Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-900 p-4 animate-gradient">
            <div className="bg-white/5 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-6xl transform transition-all duration-500 hover:shadow-3xl">
                <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 animate-pulse">
                    🚗 Car Price Prediction
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Brand Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Brand</label>
                        <input
                            type="text"
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all duration-300 placeholder-gray-500"
                            placeholder="Enter brand"
                        />
                    </div>

                    {/* Year Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Year</label>
                        <input
                            type="number"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all duration-300 placeholder-gray-500"
                            placeholder="Enter year"
                        />
                    </div>

                    {/* Present Price Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Present Price (₹)</label>
                        <input
                            type="number"
                            value={enteredPrice}
                            onChange={(e) => setEnteredPrice(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all duration-300 placeholder-gray-500"
                            placeholder="Enter price"
                        />
                    </div>

                    {/* Kilometers Driven Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Kilometers Driven</label>
                        <input
                            type="number"
                            value={enteredKM}
                            onChange={(e) => setEnteredKM(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all duration-300 placeholder-gray-500"
                            placeholder="Enter kilometers"
                        />
                    </div>

                    {/* Fuel Type Select */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Fuel Type</label>
                        <select
                            value={selectedFuel}
                            onChange={(e) => setSelectedFuel(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all duration-300 appearance-none"
                        >
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="CNG">CNG</option>
                        </select>
                    </div>

                    {/* Seller Type Select */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Seller Type</label>
                        <select
                            value={selectedSellerType}
                            onChange={(e) => setSelectedSellerType(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all duration-300"
                        >
                            <option value="Dealer">Dealer</option>
                            <option value="Individual">Individual</option>
                        </select>
                    </div>

                    {/* Transmission Select */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Transmission</label>
                        <select
                            value={selectedTransmission}
                            onChange={(e) => setSelectedTransmission(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all duration-300"
                        >
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                        </select>
                    </div>

                    {/* Owner Select */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Owner</label>
                        <select
                            value={selectedOwner}
                            onChange={(e) => setSelectedOwner(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all duration-300"
                        >
                            <option value="0">First Owner</option>
                            <option value="1">Second Owner</option>
                            <option value="2">Third Owner</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-full flex justify-center mt-6">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl relative overflow-hidden"
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Predicting...
                                </div>
                            ) : (
                                <>
                                    🔍 Check Value
                                    <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Predicted Price */}
                {predictedPrice !== null && (
                    <div className="mt-8 animate-fade-in-up">
                        <h3 className="text-2xl font-semibold text-center bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                            Predicted Price: ₹{predictedPrice}
                        </h3>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mt-4 animate-shake text-center">
                        <p className="text-red-400 font-medium">{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PredictionForm;