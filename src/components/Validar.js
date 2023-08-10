const Validar = (text) => {
    let patt = new RegExp(/^[A-Za-z0-9\s]+$/g);
    return patt.test(text)
}

export default Validar