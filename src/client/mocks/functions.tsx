export default {
    promise: function p<T>(arg1?: any, arg2?: any, arg3?: any): Promise<T>{
        if (arg1 && arg2 && arg3) {}
        return new Promise(resolve=>resolve());
    },
    func: function p<T>(arg1?: any, arg2?: any, arg3?: any): T {
        if (arg1 && arg2 && arg3) {}
        return ({} as T);
    }
}