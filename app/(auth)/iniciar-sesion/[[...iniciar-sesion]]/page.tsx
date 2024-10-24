import { SignIn } from "@clerk/nextjs"

const SignInPage = () => {
  return (
    <section className="flex flex-col min-h-dvh w-full items-center justify-center">
      <h1 className="text-3xl text-center mb-8">Iniciar sesión</h1>
      <SignIn path="/iniciar-sesion" />
    </section>
  )
}
 
export default SignInPage