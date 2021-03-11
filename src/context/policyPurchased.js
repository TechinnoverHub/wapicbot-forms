import React from 'react'
import { createContext, useState } from "react";

export const PolicyIDContext = createContext();

export const PolicyIDProvider = ({ children }) => {
  const [payloadContext, setPayloadContext] = useState('jk');
  return (
    <PolicyIDContext.Provider value={[payloadContext, setPayloadContext]}>
        {children}
    </PolicyIDContext.Provider>
  );
}