import UrlForm from '../components/UrlForm'

const HomePage = () => {
  
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-5">URL Shortener</h1>         
          <UrlForm/>
        </div>
      </div>
    )
}

export default HomePage