const SpinnerIcon = () => (
  <div className="flex justify-center items-center h-screen">
    <svg className="animate-spin h-10 w-10 text-indigo-600" viewBox="0 0 24 24">
      <circle
        className="text-gray-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        cx="12"
        cy="12"
        r="10"
      />
    </svg>
  </div>
);

export default SpinnerIcon;
