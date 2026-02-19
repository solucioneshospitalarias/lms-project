import React, { useEffect } from "react";
import About from "../About/About";
import styles from "./Conocenos.module.css";

const Conocenos = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.conocenosFadeIn}>
            <About />
        </div>
    );
};

export default Conocenos;