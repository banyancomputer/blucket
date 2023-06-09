import LoadingSpinner from '@/components/utils/spinners/loading/LoadingSpinner';

const LoadingScreen = () => (
  <div className="flex items-center justify-center h-[calc(100vh-72px)] w-full">
    <LoadingSpinner />
  </div>
);

export default LoadingScreen;
