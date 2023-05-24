import { useState } from "react"

interface fromZeroToTen {
  spiciness_scale: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
}
interface data extends fromZeroToTen {
  name: string
  preperation_time: string
  type: string
  number_of_slices: number
  diameter: number
  slices_of_bread: string
}

function App() {
  const [data, setData] = useState<data>({
    name: "",
    preperation_time: "",
    type: "",
    number_of_slices: 0,
    diameter: 0,
    spiciness_scale: 0,
    slices_of_bread: "",
  })

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
  }
  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setData((prevData) => ({
      ...prevData,
      type: event.target.value,
    }))
  }

  return (
    <>
      <form
        onSubmit={() => handleSubmit}
        className="flex flex-col items-center justify-center bg-slate-800 w-screen h-screen"
      >
        <div className="">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="preparation-time"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Preparation time
            </label>
            <input
              type="text"
              id="preparation-time"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Preparation time"
              required
            />
          </div>
          <div>
            <label
              htmlFor="type-id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select an option
            </label>
            <select
              id="type-id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleSelectChange}
            >
              <option selected>Select a type</option>
              <option value="Pizza">Pizza</option>
              <option value="Soup">Soup</option>
              <option value="Sandwich">Sandwich</option>
            </select>
          </div>
          {data.type === "Pizza" && (
            <>
              <div>
                <label
                  htmlFor="number-of-slices"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Number of slices
                </label>
                <input
                  type="text"
                  id="number-of-slices"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Number of slices"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="diameter"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Diameter
                </label>
                <input
                  type="text"
                  id="diameter"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Diameter"
                  required
                />
              </div>
            </>
          )}

          {data.type === "Soup" && (
            <>
              <div>
                <label
                  htmlFor="spiciness-scale"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Spiciness scale
                </label>
                <input
                  type="text"
                  id="spiciness-scale"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Spiciness scale"
                  required
                />
              </div>
            </>
          )}

          {data.type === "Sandwich" && (
            <>
              <div>
                <label
                  htmlFor="slices-of-bread"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Slices of bread
                </label>
                <input
                  type="text"
                  id="slices-of-bread"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Slices of bread"
                  required
                />
              </div>
            </>
          )}

          <div>
            <button
              type="submit"
              className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Send
            </button>

            <button
              type="reset"
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default App
