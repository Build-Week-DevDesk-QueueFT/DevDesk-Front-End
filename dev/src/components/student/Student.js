import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Title"
        name="Title"
        ref={register({ required: true, min: 2, maxLength: 80 })}
      />
      <textarea
        name="Description"
        placeholder="Description"
        ref={register({ required: true, max: 2, maxLength: 300 })}
      />
      <input
        type="text"
        placeholder="Tried"
        name="Tried"
        ref={register({
          required: true,
          min: 2,
          maxLength: 128,
          pattern: /^\S+@\S+$/i,
        })}
      />
      <input
        type="text"
        placeholder="Category"
        name="Category"
        ref={register({ required: true, min: 2, maxLength: 128 })}
      />

      <input type="submit" />
    </form>
  );
}
