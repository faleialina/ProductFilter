function Options({ array }) {
    const res = array.map((elem, index) => <p key={index}>{elem}</p>);

    return (
        <>
            {res}
        </>
    )
}
export default Options;