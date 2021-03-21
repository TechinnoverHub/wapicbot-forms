import React from 'react'
import { createContext, useState } from "react";

export const QuoteContext = createContext();

export const QuoteProvider = ({ children }) => {
  const [quoteContext, setQuoteContext] = useState({});
  return (
    <QuoteContext.Provider value={[quoteContext, setQuoteContext]}>
        {children}
    </QuoteContext.Provider>
  );
}