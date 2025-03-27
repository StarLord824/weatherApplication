const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Outer circle */}
        <div className="w-16 h-16 rounded-full border-4 border-blue-100/30 animate-pulse"></div>
        {/* Inner spinning circle */}
        <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-t-white border-r-white border-b-transparent border-l-transparent animate-spin"></div>
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-9 h-9 border-4 border-t-white border-r-white border-b-transparent border-l-transparent  rounded-full animate-spin"></div>
      </div>
      <span className="ml-4 text-white text-lg">Loading weather data...</span>
    </div>
  );
};

export default LoadingAnimation;
