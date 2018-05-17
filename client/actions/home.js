export const HOME = Symbol('home');

export function initHome(data){
    return {
        type: HOME,
        data
    };
}
