import { useFetch } from "../hooks/useFetch";
import { useLocation } from 'react-router-dom';

export const Sending = () => {
  const location = useLocation();
  const { value } = location.state;
  const result = useFetch("", value, "users", "PUT");
  const toPrint = result.result.message

  return (
    <div className="container">
      <div>
        <p className="py-4 text-center">
          {toPrint}
        </p>
      </div>
    </div>
  )
}
