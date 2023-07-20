interface props {
  errorDescription: string;
}

export const IdentityErrorListItem = ({ errorDescription }: props) => {
  return <p>{errorDescription}</p>;
};
