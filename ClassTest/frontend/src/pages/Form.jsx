import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from "axios"
const Form = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [age, setAge] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3000/api/profiles', {
            name,
            email,
            phone,
            address,
            age: Number(age)
        });
        navigate('/api/profile');
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
        type='text'
        placeholder='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

        <input
        type='email'
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <input
        type='text'
        placeholder='phone'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        />

        <input
        type='text'
        placeholder='address'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        />

        <input
        type='text'
        placeholder='age'
        value={age}
        onChange={(e) => setAge(e.target.value)}
        />

        <button type="submit">Add Profile</button>
      </form>
    </div>
  )
}

export default Form
