import { useFetchUnitByUser } from '../hooks/useFetchUnitByUser';
import Placeholder from '../assets/profile-image-placeholder.jpeg';
import { Loading } from '../components/Loading';
import '../assets/UserProfile.css';

export const UnitProfile = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const id = currentUser.id
  const { result: unit, loading, error } = useFetchUnitByUser(id, "", "units", "GET");

  if (loading) {
    return (<Loading />)
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!unit) {
    return <div>No unit found</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <p>{unit.unit.title}</p>
          <p>{unit.unit.address}</p>
          <button>edit</button>
        </div>
        <div className="col-4">
          <img className="profile_img" src={Placeholder} alt='unit profile' />
        </div>
      </div>
    </div>
  );
};
