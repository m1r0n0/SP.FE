import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { confirmDelete } from "../../../../Services";

export default function DeleteAccount() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((s) => s.user.user.userId);

  return (
    <div>
      <input
        value="Delete"
        type="button"
        onClick={() => dispatch(confirmDelete(userId))}
      />
    </div>
  );
}
