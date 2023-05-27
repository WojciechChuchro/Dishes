import { useState } from "react"
import { Errors, FormData } from "./types"
import { validateForm } from "./validation"
import { initialData, initialErrors } from "./initialState"
import RenderErrors from "./renderErrors"

function App() {
  const [data, setData] = useState<FormData>(initialData)
  const [errors, setErrors] = useState<Errors>(initialErrors)
  const withoutErrors = Object.values(errors).every((error) => error === null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    validateForm(setErrors, data)

    if (withoutErrors) {
      fetch("https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response:", data)
        })
        .catch((error) => {
          console.error("Error:", error)
        })
    }
    setData(initialData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center bg-slate-800 w-screen h-screen"
      >
        <div className="flex flex-col">
          <RenderErrors errors={errors} />
          <div className="flex flex-col gap-3">
            <input
              onChange={handleChange}
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              name="name"
              required
              value={data.name}
            />

            <input
              onChange={handleChange}
              type="text"
              id="preparation-time"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Preparation time"
              name="preparation_time"
              required
              value={data.preparation_time}
            />

            <select
              id="type"
              name="type"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
              value={data.type}
              required
            >
              <option value="">Select a type</option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="sandwich">Sandwich</option>
            </select>

            {data.type === "pizza" && (
              <>
                <input
                  onChange={handleChange}
                  type="number"
                  value={data.no_of_slices || ""}
                  id="no_of_slices"
                  name="no_of_slices"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Number of slices"
                  required
                />

                <input
                  onChange={handleChange}
                  type="number"
                  value={data.diameter || ""}
                  id="diameter"
                  name="diameter"
                  className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Diameter"
                  required
                />
              </>
            )}

            {data.type === "soup" && (
              <>
                <input
                  onChange={handleChange}
                  type="number"
                  value={data.spiciness_scale || ""}
                  id="spiciness-scale"
                  name="spiciness_scale"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Spiciness scale"
                  required
                />
              </>
            )}

            {data.type === "sandwich" && (
              <>
                <input
                  onChange={handleChange}
                  type="number"
                  value={data.slices_of_bread || ""}
                  id="slices-of-bread"
                  name="slices_of_bread"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Slices of bread"
                  required
                />
              </>
            )}
          </div>

          <div className="mt-2 flex justify-center items-center">
            <button
              type="submit"
              className=" text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default App
