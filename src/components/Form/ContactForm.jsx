import css from './ContactForm.module.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import { nanoid } from "nanoid";
import * as Yup from "yup";

const initialValues = {
    name: "",
    number: "",
};

const FeedbackSchema = Yup.object().shape({
    name: Yup.string().matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ' -]+$/, "Invalid name format").min(3, "Too short").max(50, "Too long").required("Required"),
    number: Yup.string().matches(/^\+?[0-9\s\-()]{7,20}$/, "Invalid phone number").required("Required").min(7).max(7, "Too long"),
});


export default function ContactForm({addContact}){

    const nameField = useId();
    const numberField = useId();

    const handleSubmit = (values, actions) => {
        addContact({ id: nanoid(), ...values });
        actions.resetForm(); 
    };

    return(
        <Formik initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}>

            <Form className={css.form}>

                <div>
                    <label htmlFor={nameField}>Name</label>
                    <Field className={css.input} type="text" name="name" id={nameField}/>
                    <ErrorMessage name="name" component="span" />
                </div>
                <div>
                    <label htmlFor={numberField}>Number</label>
                    <Field className={css.input} type="tel" name="number" id={numberField}/>
                    <ErrorMessage name="number" component="span" />
                </div>
                <button type="submit">Add contact</button>
                
            </Form>

        </Formik>
    )
}