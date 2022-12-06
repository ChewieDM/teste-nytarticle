import React, {useState} from 'react'

const ShowForm = ({searchShow}) => {
    const [show, setShow] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        searchShow(show)
    }

  return (
    <div>
    <form onSubmit={handleSubmit}>
        <input
        type="text" 
        placeholder="e.g 1-10" 
        className="py-1 px-2 rounded-l-lg my-2" 
        onChange={(e) => setShow(e.target.value)}
        />
        <button type="Submit" className="bg-green-400 py-1 px-2 rounded-r-lg text-black">Apply Filter</button>
    </form>
    </div>
  )
}

export default ShowForm