import { useFetch } from "../hooks/useFetch";
import { useLocation } from 'react-router-dom';

export const Sending = () => {
  const location = useLocation();
  const { value } = location.state;
  useFetch("", value, "users", "PUT");

  return (
    <div>Set!</div>
  )
}
