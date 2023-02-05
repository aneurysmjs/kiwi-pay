/**
 * @link https://medium.com/@rivoltafilippo/typing-react-context-to-avoid-an-undefined-default-value-2c7c5a7d5947
 */
import { useContext, createContext, Provider } from 'react';

type MakeGenericContext<T> = readonly [() => T, Provider<T | undefined>];

const makeGenericContext = <T extends unknown>(
  contextName = 'makeGenericContext',
): MakeGenericContext<T> => {
  // Create a context with a generic parameter or undefined
  const GenericContext = createContext<T | undefined>(undefined);

  // Check if the value provided to the context is defined or throw an error
  const useGenericContext = () => {
    const contextIsDefined = useContext(GenericContext);
    if (!contextIsDefined) {
      throw new Error(`${contextName} must be used within a Provider`);
    }
    return contextIsDefined;
  };

  return [useGenericContext, GenericContext.Provider] as const;
};

export default makeGenericContext;
