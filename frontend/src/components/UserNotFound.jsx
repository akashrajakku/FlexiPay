function UserNotFound() {
  return (
        <div className="flex flex-col items-center justify-center mt-6 p-4  rounded-lg pt-48">
        <svg className="w-12 h-12 text-gray-400 mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm-1-6a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-1v2a1 1 0 1 1-2 0v-3zm1-8a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" clipRule="evenodd"/>
        </svg>
        <p className="text-lg font-semibold text-gray-700">No user found</p>
        <p className="text-sm text-gray-500">Try refining your search criteria.</p>
        </div>
  )
}

export default UserNotFound