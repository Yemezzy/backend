import {z} from 'zod'

const schema = z.object({
    firstname: z.string().trim().min(1),
    lastname: z.string().trim().min(1),
    username: z.string().trim().min(1),
    email:z.string().trim().min(1),
    password: z.string().trim().min(1),
    confirm_password: z.string().trim().min(1)
    
})

const requiredinput = schema.required({
    firstname: true,
    lastname: true,
    username:true, 
    email:true, 
    password:true,
    confirm_password: true
})
export {schema, requiredinput}