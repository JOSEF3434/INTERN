//import React from 'react'

const Sfooter = () => {
  return (
    <div>
      <footer className="text-center p-8 bg-gray-900 text-gray-200">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
          <div className="flex justify-center mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2 hover:scale-150">
              <img src="../assets/icon/facebook.svg" alt="facebook" className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mx-2 hover:scale-150">
              <img src="../assets/icon/twitter.svg" alt="twitter" className="h-6 w-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2 hover:scale-150">
              <img src="../assets/icon/instagram.svg" alt="instagram" className="h-6 w-6" />
            </a>
          </div>
        </footer>
    </div>
  )
}

export default Sfooter