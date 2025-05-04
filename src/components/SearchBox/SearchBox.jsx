import { useId } from "react";
import css from './SearchBox.module.css';

export default function SearchBox({ handleChange, value }) {
    const searchId = useId();

    return (
        <div className={css.div}>
            <label>Find contacts by name</label>
            <input className={css.input}
                id={searchId}
                type="text"
                name="search"
                value={value}
                onChange={(ev) => handleChange(ev.target.value)}
            />
        </div>
    );
}