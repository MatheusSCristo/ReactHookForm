
import {useForm} from "react-hook-form"
import {z} from "zod"
import { zodResolver} from "@hookform/resolvers/zod"

const App = () => {
  
  const createUserFormSchema=z.object({
    email:z.string().min(1).email("Email inválido"),
    password:z.string().min(6,"Precisa ter no mínimo 6 caracteres"),
    confirmPassword:z.string()
  }).refine((data)=>data.password===data.confirmPassword,{
    path:['confirmPassword'],
    message:"Passwords dont match"
  })
  
  type createUserType=z.infer<typeof createUserFormSchema>


  const {register,
    handleSubmit,
    formState:{errors}
    }=useForm<createUserType>({
    resolver:zodResolver(createUserFormSchema)
  })

  const createUser=(data:any)=>{
    console.log(data)
  }

  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
      <form className=' flex flex-col  gap-2  ' onSubmit={handleSubmit(createUser)}>
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          className='w-64 bg-zinc-300 rounded'
          {...register("email")}
          />
          {errors.email && <span>{errors.email.message}</span>}
          
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          className='w-64 bg-zinc-300 rounded'
          {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}
        
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          type='password'
          className='w-64 bg-zinc-300 rounded'
          {...register("confirmPassword")}
          />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        
        
        <button type="submit" className="bg-emerald-500 rounded w-[50%] m-auto">Enviar</button>
      </form>
    </div>
  )
}

export default App