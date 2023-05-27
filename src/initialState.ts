import { FormData, Errors } from "./types.ts"

export const initialData: FormData = {
  name: "",
  preparation_time: "",
  type: "",
}

export const initialErrors: Errors = {
  name: null,
  preparation_time: null,
  type: null,
  no_of_slices: null,
  diameter: null,
  spiciness_scale: null,
  slices_of_bread: null,
}
