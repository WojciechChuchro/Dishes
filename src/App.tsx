import { useState } from "react"

interface FormData {
  name: string
  preparation_time: string
  type: string
  no_of_slices?: number | null
  diameter?: number | null
  spiciness_scale?: number | null
  slices_of_bread?: number | null
}

interface Errors {
  name: string | null
  preparation_time: string | null
  type: string | null
  no_of_slices: string | null
  diameter: string | null
  spiciness_scale: string | null
  slices_of_bread: string | null
}

const initialData: FormData = {
  name: "",
  preparation_time: "",
  type: "",
}

const initialErrors: Errors = {
  name: null,
  preparation_time: null,
  type: null,
  no_of_slices: null,
  diameter: null,
  spiciness_scale: null,
  slices_of_bread: null,
}

function App() {
  const [data, setData] = useState<FormData>(initialData)
  const [errors, setErrors] = useState<Errors>(initialErrors)
  const withoutErrors = Object.values(errors).every((error) => error === null)
  const validateForm = () => {
    const timeRegex =
      /^(?:[0-9]|[01][0-9]|2[0-3]):(?:[0-5][0-9]):(?:[0-5][0-9])$/

    setErrors(initialErrors)

    if (data.name.trim() === "") {
      setErrors((errors) => ({ ...errors, name: "Dish name is required" }))
    } else {
      setErrors((errors) => ({ ...errors, name: null }))
    }

    if (data.preparation_time.trim() === "") {
      setErrors((errors) => ({
        ...errors,
        preparation_time: "Preparation time is required",
      }))
    } else if (!timeRegex.test(data.preparation_time.trim())) {
      setErrors((errors) => ({
        ...errors,
        preparation_time: "Preparation time has invalid syntax",
      }))
    } else {
      setErrors((errors) => ({ ...errors, preparation_time: null }))
    }

    if (data.type === "") {
      setErrors((errors) => ({ ...errors, type: "Dish type is required" }))
    } else {
      setErrors((errors) => ({ ...errors, type: null }))
    }

    if (data.type === "pizza") {
      if (
        data.no_of_slices === null ||
        data.no_of_slices === undefined ||
        data.no_of_slices <= 0
      ) {
        setErrors((errors) => ({
          ...errors,
          no_of_slices: "Number of slices must be greater than 0",
        }))
      } else {
        setErrors((errors) => ({ ...errors, no_of_slices: null }))
      }

      if (
        data.diameter === null ||
        data.diameter === undefined ||
        data.diameter <= 0
      ) {
        setErrors((errors) => ({
          ...errors,
          diameter: "Diameter must be greater than 0",
        }))
      } else {
        setErrors((errors) => ({ ...errors, diameter: null }))
      }
    } else {
      setErrors((errors) => ({ ...errors, no_of_slices: null, diameter: null }))
    }

    if (data.type === "soup") {
      if (
        data.spiciness_scale === null ||
        data.spiciness_scale === undefined ||
        data.spiciness_scale < 1 ||
        data.spiciness_scale > 10
      ) {
        setErrors((errors) => ({
          ...errors,
          spiciness_scale: "Spiciness scale must be between 1 and 10",
        }))
      } else {
        setErrors((errors) => ({ ...errors, spiciness_scale: null }))
      }
    } else {
      setErrors((errors) => ({ ...errors, spiciness_scale: null }))
    }

    if (data.type === "sandwich") {
      if (
        data.slices_of_bread === null ||
        data.slices_of_bread === undefined ||
        data.slices_of_bread <= 0
      ) {
        setErrors((errors) => ({
          ...errors,
          slices_of_bread: "Number of slices of bread must be greater than 0",
        }))
      } else {
        setErrors((errors) => ({ ...errors, slices_of_bread: null }))
      }
    } else {
      setErrors((errors) => ({ ...errors, slices_of_bread: null }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    validateForm()

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

  const renderErrors = () => {
    return Object.entries(errors).map(([key, value]) => {
      if (typeof value === "string") {
        return (
          <div
            className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
            role="alert"
            key={key}
          >
            <svg
              aria-hidden="true"
              className="flex-shrink-0 inline w-5 h-5 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">{value}</span>{" "}
            </div>
          </div>
        )
      }
      return null
    })
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center bg-slate-800 w-screen h-screen"
      >
        <div className="flex flex-col">
          {renderErrors()}
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
              id="type-id"
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
                  value={data.no_of_slices || 0}
                  id="no_of_slices"
                  name="no_of_slices"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Number of slices"
                  required
                />

                <input
                  onChange={handleChange}
                  type="number"
                  value={data.diameter || 0}
                  id="diameter"
                  name="diameter"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  value={data.spiciness_scale || 0}
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
                  value={data.slices_of_bread || 0}
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
