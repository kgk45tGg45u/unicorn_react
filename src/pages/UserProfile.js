import { useFetch } from '../hooks/useFetch';
import Placeholder from '../assets/profile-image-placeholder.jpeg';
import '../assets/UserProfile.css';

export const UserProfile = () => {
  const { result: user, loading, error } = useFetch(1, "", "users", "GET");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <p>{user.user.name}</p>
          <p>{user.user.address}</p>
          <p>{user.user.phone}</p>
          <button>edit</button>
        </div>
        <div className="col-4">
          <img className="profile_img" src={Placeholder} alt='user profile' />
        </div>
      </div>
    </div>
  );
};
