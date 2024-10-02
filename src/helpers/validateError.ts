export function validateError(error: any): Promise<never> {
    if(error.response) {
        const nonFieldErrors = error.response.data.Error
        throw new Error(nonFieldErrors);
    }
    throw new Error('Возникла неизвестная ошибка');
}