import { registerWebModule, NativeModule } from 'expo';

class MinimalUIModule extends NativeModule<{}> {}

export default registerWebModule(MinimalUIModule, 'MinimalUIModule');
