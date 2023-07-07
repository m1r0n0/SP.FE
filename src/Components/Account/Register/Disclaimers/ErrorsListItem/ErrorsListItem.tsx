interface props {
    errorDescription: string;
}

export const ErrorsListItem = ({errorDescription}:props) =>{
return <p>{errorDescription}</p>
}