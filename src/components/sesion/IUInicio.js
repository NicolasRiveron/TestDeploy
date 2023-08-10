import FormInicio from "./FormInicio"
import Logo from "./Logo"

const IUInicio = () => {
  return (
    <main className="sesion">
      <section className="form-sesion text-center py-5 ">
        <article>
          <Logo />
          <h1 className="h3 mb-3">Inicio de Sesion</h1>
          <FormInicio />
        </article>
      </section>
    </main>
  )
}

export default IUInicio