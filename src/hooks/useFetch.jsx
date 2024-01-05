import React, { useState, useEffect } from 'react'

//con api´s

export const useFetch = (url, dependencias = []) => {
    const [data, setData] = useState (null)

    useEffect(() => {
        fetch(url)
            .then(resp => resp.json())
            .then((respData) => {
                setData(respData)
            })
    }, dependencias)
  
    return {data}
}
