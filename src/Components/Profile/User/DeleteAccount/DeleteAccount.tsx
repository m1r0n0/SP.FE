import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { confirmDelete } from "../../../../Services";
import { AppDispatch } from "../../../../Store";

export default function DeleteAccount() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((s) => s.user.user.userId);
  const [isAlreadyDeleted, setIsAlreadyDeleted] = useState(false);

  return (
    <div id="delete-account-component">
      <input
        type="button"
        className="btn delete-button"
        value="Delete"
        onClick={() => {
          dispatch(confirmDelete(userId, isAlreadyDeleted));
          setIsAlreadyDeleted(true);
        }}
      />
    </div>
  );
}
