export default function Contact({ id, name, number, onDelete }) {
    return (
        <li>
            <p>{name}</p>
            <p>{number}</p>
            <button onClick={() => onDelete(id)} type="button">Delete</button>
        </li>
    );
}