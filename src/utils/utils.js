import { MOCK_DATA } from "../mocks/data"

export const Datos = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(MOCK_DATA)
      }, 3000)
    })
  }