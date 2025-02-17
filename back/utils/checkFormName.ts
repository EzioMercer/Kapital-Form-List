import ErrorCodes from './ErrorCodes.ts';

type NameHasErrors = {
    isValid: false,
    message: string,
    code: ErrorCodes
}

type NameIsFine = {
    isValid: true
}

const hasNotAllowedCharacters = /[^a-z0-9]/gi;
const startWithCapitalLetterRegexp = /^[A-Z]/;

const checkFormName = (formName: string): NameHasErrors | NameIsFine => {
    const error: NameHasErrors = {
        isValid: false,
        code: ErrorCodes.BAD_REQUEST,
        message: ''
    }

    if (hasNotAllowedCharacters.test(formName)) {
        return {
            ...error,
            message: 'Form name should contain only English alphabetic characters and numbers'
        }
    }

    if (!startWithCapitalLetterRegexp.test(formName)) {
        return {
            ...error,
            message: 'Form name should start with capital letter'
        }
    }

    return {
        isValid: true,
    };
}

export default checkFormName;
