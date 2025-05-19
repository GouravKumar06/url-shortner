import { useState } from 'react';
import { createShortUrl } from '../apis/createShortUrl';

const UrlForm = () => {
    const [url, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(url === ''){
            return setError('Please enter an url to get the Shortened Url')
        }
        setIsLoading(true)
        setError('')
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            // Replace with your actual API endpoint
            const response = await createShortUrl(url)
            
            console.log("response: ", response)
            
            if (!response.data.message === 'Short URL created successfully') throw new Error(response.data.message || 'Failed to shorten URL')
            
            setShortUrl(response.data.shortUrl)
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }


    const isValidUrl = (urlString) => {
        try {
            const url = new URL(urlString)
            return url.protocol === 'http:' || url.protocol === 'https:'
        } catch (error) {
            return `url is not valid with error: ${error}`
        }
    }
      
  return (
    <>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                Enter your URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => {
                    setUrl(e.target.value)
                    if (e.target.value && !isValidUrl(e.target.value)) {
                      setError('Please enter a valid URL including http:// or https://')
                    } else {
                      setError('')
                    }
                }}
                placeholder="https://example.com/very-long-url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Shortening...' : 'Shorten URL'}
            </button>
          </form>
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          {shortUrl && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h2 className="text-sm font-medium text-gray-700 mb-2">Your shortened URL:</h2>
              <div className="flex items-center">
                <input
                  type="text"
                  value={shortUrl}
                  readOnly
                  className="flex-1 p-2 border border-gray-300 rounded-md mr-2 bg-white"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shortUrl);
                    alert('URL copied to clipboard!');
                  }}
                  className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
    </>
  )
}

export default UrlForm








