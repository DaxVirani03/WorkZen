'use client';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-center">
      <div>
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Page not found
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}
