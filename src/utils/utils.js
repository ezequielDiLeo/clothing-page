import { MOCK_DATA } from "../mocks/data"

export const Datos = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
          resolve(MOCK_DATA)
      }, 1000)
    })
  }