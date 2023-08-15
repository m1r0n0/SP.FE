import React, { useState } from "react";
import { IServiceInfo } from "../../../../Models/service";
import { useAppDispatch } from "../../../../hooks";
import ProviderServiceEdit from "./ProviderServiceEdit/ProviderServiceEdit";
import ProviderServiceView from "./ProviderServiceView";

interface props {
  service: IServiceInfo;
}

export default function ProviderService({ service }: props) {
  var dispatch = useAppDispatch();

  const [isEditingMode, setIsEditingMode] = useState(false);

  return (
    <div>
      {isEditingMode ? (
        <ProviderServiceEdit
          service={service}
          setIsEditingMode={setIsEditingMode}
        />
      ) : (
        <ProviderServiceView
          service={service}
          setIsEditingMode={setIsEditingMode}
        />
      )}
    </div>
  );
}
