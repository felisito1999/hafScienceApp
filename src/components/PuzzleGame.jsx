import React, { useEffect } from 'react';
//import styles from '../styles/Puzzle.css';


const PuzzleGame = () => {
   
    return (
        // <div onLoad={setUp}>
        //     <h1>Rompecabezas elemental</h1>
        //     <div id="modal" className={styles["hide"]}>
        //         <div id="header">
        //             <button id="closeBtn" onClick={hideModal}>
        //                 x
        //             </button>
        //         </div>
        //         <h1 id="message">You won!</h1>
        //     </div>
        //     <div id="container">
        //         <ul>
        //             <li></li>
        //             <li></li>
        //             <li></li>
        //             <li></li>
        //             <li></li>
        //             <li></li>
        //             <li></li>
        //             <li></li>
        //             <li></li>
        //         </ul>
        //     </div>
        //     <h1>Ordena los elementos según su número atómico</h1>
        // </div>
        // <div>
        // </div>
        <div className=" h-100">
            <iframe key={1} className=" h-100 w-100" src="\puzzle.html" height="600" width="600" frameborder="0"></iframe>
        </div>
    );
};

export default PuzzleGame;
