import React from "react";
import SuccessDisclaimer from "./SuccessDisclaimer";
import {useAppSelector} from "../../../hooks";

export default function InvalidInputDisclaimer() {
    const showProviderRegisterFailedDisclaimer = useAppSelector(
        (s) => s.disclaimer.showProviderRegisterFailedDisclaimer
    );
    return showProviderRegisterFailedDisclaimer ? (
        <p className="message-result-failed">Invalid input data!</p>
    ) : (
        <SuccessDisclaimer/>
    );
}
