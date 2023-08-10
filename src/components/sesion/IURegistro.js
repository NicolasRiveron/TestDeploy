import FormRegistro from './FormRegistro'
import Logo from "./Logo"

const IURegistro = () => {
    return (
        <main className="sesion">
            <section className="form-sesion text-center py-5">
                <article>
                    <Logo />
                    <h1 className="h3 mb-3">Registro</h1>
                    <FormRegistro />
                </article>
            </section>
        </main>
    )
}

export default IURegistro