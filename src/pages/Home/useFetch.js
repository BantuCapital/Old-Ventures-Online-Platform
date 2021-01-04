import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useFetch(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [businesses, setBusiness] = useState([])
  const [hasMore, setHasMore] = useState(false)
  useEffect(() => {
    setBusiness([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)

    let cancel
    axios({
      method: 'GET',
     url: `${process.env.REACT_APP_API_END}/businesses/allbusinesses/${query}/${pageNumber}`, // First page at 0
       headers: {
      "x-auth-token": localStorage.getItem("token"),
      },
      params: { page: pageNumber,query:query },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      console.log(res)
      setBusiness(prevBusinesses => {
        return [...new Set([...prevBusinesses, ...res.data])]
      })
      setHasMore(res.data.length > 0)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [query, pageNumber])

  return { loading, error, businesses, hasMore }
}
