import React from "react";
import { useForm } from "react-hook-form";
import './style.css'

function Form() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
  };
  const validateUserName = async value => {
    await setTimeout(1000);

    if (value === "vini") return true;
    
    return false;
  }

  return (
    <form className="App" onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign in</h1>
      <label>first name</label>
      <input
        name="firstname"
        ref={register({ required: true, minLength: 10 })}
      />
      {errors.firstname && errors.firstname.type === "required" && ( 
        <p>this is required</p>
      )}
        {errors.firstname && errors.firstname.type === "minLength" && ( 
        <p>this is field required min length of 5</p>
      )}


      <label>last name</label>
      <input
        name="lastname"
        ref={register({ required: true })}
      />
      {errors.lasttname && <p>this is required</p>}

      <label>username</label>
      <input
        name="username"
        ref={register({ required: true, validate:validateUserName })}
      />
      {errors.username && <p>this is required</p>}

      <label>email</label>
      <input name="email" ref={register({ required: true, })} />
      {errors.email && <p>this is required</p>}

      <label>about you</label>
      <textarea
        name="aboutyou"
        ref={register({ required: true, })}
      />

      <input type="submit" ref={register({ required: true, })} />
    </form>
  );
}

export default Form;
