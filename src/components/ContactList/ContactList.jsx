import Contact from './Contact'
import css from './ContactList.module.css'

export default function ContactList({ contacts, onDelete}) {
    return (
        <ul className={css.list}>
            {contacts.map(({ id, name, number }) => (
                <Contact id={id} onDelete={onDelete} key={id} name={name} number={number} />
            ))}
        </ul>
    );
}