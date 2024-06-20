<></>
import { useState } from "react"
import { useForm } from "react-hook-form";
import clsx from "clsx";
export default function RHF () {
  const [todos, setTodos] = useState([]);
  // const [text, setText ]= useState("")

  const  { register, handleSubmit, formState: { errors,isValid, isSubmitted }, reset } = useForm()

  
  function removeTodo(indexToRemove) {
    //todos.splice(indexToRemove, 1)
    //setTodos([...todos])

    const newTodos = todos.filter(((todo, idx) => idx !== indexToRemove));
    setTodos(newTodos)
  }
  
  /** data es un objeto que contiene en cada propiedad el valor de cada input del formulario
   * data.todo contendria el valor del input con name="todo"
   * 
   */
  function onSubmit(data) {
    console.log("data: ", data);
    setTodos([
        ...todos,
        data.todo
    ])
    reset()
  }
 
  return (
    <main className="w-full min-h-screen">
        <p className="w-full bg-red-500 text-black font-bold text-center p-3 ">TO-DO- REACT-HOOK-FORM</p>
    
      <form className="flex flex-row gap-2 justify-center p-5"
      onSubmit={handleSubmit(onSubmit)}>
      <input 
      type="text"
      className= {clsx("p-2 rounded-md text-black w-full max-w-screen-sm", {
        "border-2 border-red-500 bg-red-400" : errors.todo,
      })} 
      placeholder="Ingrese una tarea"
      required
      { ...register("todo", {
        required: { value:true, message: "Necesitas escribir una tarea"},
        minLength: { value:3, message: "Minimo 3 caracteres"},
        maxLength: { value:180, message:"es una biblia o que verga?"},
      }) }
      />
      <button  className={clsx(" text-black px-3 rounded", {
        "bg-slate-600": isSubmitted ? !isValid :false ,
        "bg-white": isSubmitted ? !isValid :true 
      })} 
      disabled={isSubmitted ? !isValid :false }> 
        Agregar
        </button>
      </form>
      {errors.todo && (
        <p className="text-red-500 text-sm text-center"> {errors.todo?.message}</p>
      )}
      
      
      <div className="max-w-screen-sm mx-auto p-4 flex flex-col gap-1">
        {
          todos.length=== 0 && (<p className="text-white/50 ">No hay tareas pendiente;D</p>)
        }
        { todos.length > 0 && 
          todos.map((todo,idx) => {
            return (
               <div key={`todo-${idx}`} className="bg-white/10 rounded p-4 flex flex-row  justify-between">
              <span> {todo}</span>
              <button className="text-red-500 hover:bg-red-500 hover:text-white rounded-full size-6 text-center" onClick={() => removeTodo(idx)}>X</button>
              </div>
              )
           
          })
        } 
      </div> 
    </main>
  )
} 