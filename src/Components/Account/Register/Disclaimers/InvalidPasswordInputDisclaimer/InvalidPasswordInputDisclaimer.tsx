import "./InvalidPasswordInputDisclaimer.css";

export function InvalidPasswordInputDisclaimer() {
  return (
    <ul>
      <li>Passwords must be at least 6 characters.</li>
      <li>Passwords must have at least one non alphanumeric character.</li>
      <li>Passwords must have at least one digit ('0'-'9').</li>
      <li>Passwords must have at least one uppercase ('A'-'Z').</li>
    </ul>
  );
}
