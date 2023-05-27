import { Errors, FormData } from "./types"
import { initialErrors } from "./initialState"

export const validateForm = (
  setErrors: React.Dispatch<React.SetStateAction<Errors>>,
  data: FormData
) => {
  const timeRegex = /^(?:[0-9]|[01][0-9]|2[0-3]):(?:[0-5][0-9]):(?:[0-5][0-9])$/

  setErrors(initialErrors)

  if (data.name.trim() === "") {
    setErrors((errors) => ({ ...errors, name: "Dish name is required" }))
  } else if (data.name.trim().length < 3) {
    setErrors((errors) => ({
      ...errors,
      name: "Name should have atleast 3 characters",
    }))
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
      preparation_time:
        "Preparation time has invalid syntax, correct syntax HH:MM:SS",
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
