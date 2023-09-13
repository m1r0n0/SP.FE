import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { confirmDelete } from "../../../../Services";

export default function DeleteAccount() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((s) => s.user.user.userId);

  return (
    <div id="delete-account-component">
      <input
        type="button"
        className="btn delete-button"
        value="Delete"
        onClick={() => dispatch(confirmDelete(userId))}
      />
    </div>
  );
}
