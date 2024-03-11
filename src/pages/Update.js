import { useFetch } from "../hooks/useFetch";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

export const Update = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const { value } = location.state;
  const { result, loading: fetchLoading } = useFetch("", value, "users", "PUT");

  useEffect(() => {
    setLoading(fetchLoading);
    if (result && result.message) {
      setMessage(result.message);
    }
  }, [result, fetchLoading]);

  useEffect(() => {
  }, [message]);

  if (loading) {
    return <div>Loading</div>;
  }

  if (!result) {
    return <div>An error has occurred.</div>;
  }

  return (
    <div className="container">
      <div>
        <p className="py-4 text-center">
          {message}
        </p>
      </div>
    </div>
  );
};
