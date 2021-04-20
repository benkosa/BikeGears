import GlobalStore from 'react-native-global-state-hooks';

const countStore = new GlobalStore(0);

export const useCount = countStore.getHook();