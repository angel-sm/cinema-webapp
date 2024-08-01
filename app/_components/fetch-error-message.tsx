const FetchErrorMessage = ({
  message = "Something went wrong. Please try again later.",
}) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M5.634 6.366a9.033 9.033 0 000 11.268M18.366 6.366a9.033 9.033 0 010 11.268M2 12a10 10 0 1118 0 10 10 0 01-18 0z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
      <p className="text-gray-700 mb-6">{message}</p>
    </div>
  </div>
);

export default FetchErrorMessage;
