import { NativeModule, requireNativeModule } from 'expo';

declare class MinimalUIModule extends NativeModule<{}> {}

export default requireNativeModule<MinimalUIModule>('MinimalUI');
