const Loader = () => {
  let circleCommonClasses =
    'h-4 w-4 bg-transparent rounded-full border-2 border-gray-600';

  return (
    <div className="flex h-screen justify-center items-center">
      <div className={`${circleCommonClasses} mx-1 animate-bounce`}></div>
      <div className={`${circleCommonClasses} mx-1 animate-bounce200`}></div>
      <div className={`${circleCommonClasses} mx-1 animate-bounce400`}></div>
    </div>
  );
};

export default Loader;
