const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-gray-700 dark:text-gray-100">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-medium">Loading...</p>
    </div>
  );
}

export default LoadingScreen;
