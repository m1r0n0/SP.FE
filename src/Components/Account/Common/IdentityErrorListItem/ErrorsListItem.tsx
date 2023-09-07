interface props {
  errorDescription: string;
}

export const IdentityErrorListItem = ({ errorDescription }: props) => {
  return <p className="message-result-failed">{errorDescription}</p>;
};
