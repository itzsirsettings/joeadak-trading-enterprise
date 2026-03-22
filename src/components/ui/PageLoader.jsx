import { MessageLoading } from './MessageLoading';

function PageLoader({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <MessageLoading />
        <div className="flex flex-col items-center gap-2">
          <span className="text-primary font-heading font-bold text-lg">JOEADAK TRADING ENTERPRISE</span>
          <span className="text-gray-400 text-sm">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export { PageLoader };
