export interface FormData {
  name: string
  preparation_time: string
  type: string
  no_of_slices?: number | null
  diameter?: number | null
  spiciness_scale?: number | null
  slices_of_bread?: number | null
}

export interface Errors {
  name: string | null
  preparation_time: string | null
  type: string | null
  no_of_slices: string | null
  diameter: string | null
  spiciness_scale: string | null
  slices_of_bread: string | null
}
