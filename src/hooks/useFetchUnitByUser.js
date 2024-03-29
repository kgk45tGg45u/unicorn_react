import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

const baseUrl = 'http://localhost:3001/';

export const useFetchUnitByUser = (id, data, endpoint, method) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${baseUrl}${endpoint}${id ? `/${id}` : ''}`;
        const options = {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
        };

        if (method === "POST" || method === "PUT") {
          options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        const jsonData = await response.json();
        console.log("Response data:", jsonData);

        setResult(jsonData);
        if (response.ok) {
          // toast("Successful")
        } else {
          throw new Error("Request failed");
        }
      } catch (err) {
        toast.error("Request error:", err);
        // Provide feedback to the user about the request failure
      } finally {
        setLoading(false); // Update loading state after fetch request is completed
      }
    };

    fetchData();
  }, [id, data, endpoint, method]);

  return { result, loading }; // Return loading state
};
