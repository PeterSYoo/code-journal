import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../state';

// Anytime we want to access any state inside of a component we will-
// use usedTypedSelector, and it will understand the type of data that-
// is stored inside our Redux store.
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
