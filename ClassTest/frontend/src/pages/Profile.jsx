import { useEffect, useState } from 'react'
import axios from 'axios'

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState('');

  const getprofile = async () => {
    try {
      const result = await axios.get('http://localhost:3000/api/profile');
      setProfile(result.data);
    } catch (error) {
      setError('Could not load profile');
    }
  }

  useEffect(() => {
    getprofile();
  }, []);

  const updateProfile = async () => {
    try {
      const result = await axios.get('http://localhost:3000/api/profile/:id');
      setProfile(result.data);
    } catch (error) {
      setError('Could not load profile');
    }
  }

  useEffect(() => {
    updateProfile();
  }, []);

  return (
    <div>
    <h1>Profiles</h1>
    {error && <p>{error}</p>}
    {profile.map((profile)=>{
    return (
        <div key={profile.id}>
            <p>Name={profile.name}</p>
            <p>email={profile.email}</p>
            <p>phone={profile.phone}</p>
            <p>address={profile.address}</p>
            <p>age={profile.age}</p>
      <button onClick={() => updateProfile(profile.id)}>Update</button>
        </div>
    )
      })}
    </div>
  )
}

export default Profile;
