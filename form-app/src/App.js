import React from 'react';
import { useForm } from 'react-hook-form';
import './App.css';

function App() {
const { register, handleSubmit, errors } = useForm();
const onSubmit = data => {
  console.log(data)
}

  return (
    <form className="App" onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign in</h1>
      <label>first name</label>
      <input name="firstname" ref={register ({required: true, minLength:10})}/>
        {errors.firstname && <p>this is required</p>}

      <label>last name</label>
      <input name="lastname" ref={register ({required: true, minLength:10})}/>
      {errors.lasttname && <p>this is required</p>}  

      <label>username</label>
      <input name="username" ref={register ({required: true, minLength:10})}/>
      {errors.username && <p>this is required</p>}        

      <label>email</label>
      <input name="email" ref={register ({required: true, minLength:10})}/>
      {errors.email && <p>this is required</p>}
      
      <label>about you</label>
      <textarea name="aboutyou" ref={register ({required: true, minLength:10})}/>

      <input type="submit" ref={register ({required: true, minLength:10})} />

    </form>
  );
}

export default App;
