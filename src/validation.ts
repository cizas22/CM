import * as Yup from 'yup';

export const FormSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(3, 'Too Short!')
        .max(64, 'Too Long!')
        .required('Required')
        .matches(/^(?:[A-Z][a-z']+ ){0,3}[A-Z][a-z']+$/g, "2 4 words")
    ,
    email: Yup.string().email('Invalid email')
        .test(
            'is-coaching-email',
            'Email should be combined from Full Name and separated by dot.',
            function (value) {
                const fullName = this.parent.fullName || '';
                const expectedEmail = `${fullName.toLowerCase().replace(/\s+/g, '.')}@example.com`;
                return value === expectedEmail;
            }
        ).required('Required'),
});

export const uniqueValidation = (list: Array<string>, value: string) => {
    console.log(list.includes(value))
    return list.includes(value) ? "Must be unique" : null;
}
