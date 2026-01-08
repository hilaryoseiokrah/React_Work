//PascalCasing
function Message() {
    const name = 'Hils';
    if (name)
        return <h1>Hello {name} </h1>;
    return <h1>Hello World</h1>;
}

//To use this component in other files
export default Message;