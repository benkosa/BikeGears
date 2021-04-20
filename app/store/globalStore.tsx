import GlobalStore from 'react-native-global-state-hooks';

const gStore = new GlobalStore(false)

export const useGStore = gStore.getHook();