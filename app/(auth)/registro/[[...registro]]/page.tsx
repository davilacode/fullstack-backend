import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <section className="flex flex-col min-h-dvh w-full items-center justify-center">
      <h1 className="text-3xl text-center mb-8">Registro</h1>
      <SignUp path="/registro" />
    </section>
  )
}
 
export default SignUpPage;