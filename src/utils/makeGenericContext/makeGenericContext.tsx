/**
 * @link https://medium.com/@rivoltafilippo/typing-react-context-to-avoid-an-undefined-default-value-2c7c5a7d5947
 */
import { useContext, createContext, Provider } from 'react';

type MakeGenericContext<T> = readonly [() => T, Provider<T | undefined>];

const makeGenericContext = <T extends unknown>(): MakeGenericContext<T> => {
  // Create a context with a generic parameter or undefined
  const genericContext = createContext<T | undefined>(undefined);

  // Check if the value provided to the context is defined or throw an error
  const useGenericContext = () => {
    const contextIsDefined = useContext(genericContext);
    if (!contextIsDefined) {
      throw new Error('makeGenericContext must be used within a Provider');
    }
    return contextIsDefined;
  };

  return [useGenericContext, genericContext.Provider] as const;
};

export default makeGenericContext;
