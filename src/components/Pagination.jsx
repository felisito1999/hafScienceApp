import { tsTypeParameterInstantiation } from '@babel/types';
import React, { useEffect, useState } from 'react';

const Pagination = (props) => {
    const [pages, setPages] = useState([]);
    const [actualPage, setActualPage] = useState(1);

    const setPagesItems = (totalCount, pageSize) => {
        const newPages = [];
        const pageCount = Math.ceil(totalCount / pageSize);

        if (pages.length !== pageCount) {
            for (let i = 0; i < pageCount; i++) {
                newPages.push(i + 1);
            }
        }

        console.log(newPages.length)
        setPages(newPages);
    };

    useEffect(() => {
        setActualPage(props.actualPage);
    }, [props.actualPage]);

    useEffect(() => {
        setPagesItems(props.recordsTotal, props.pageSize)
    },[props.recordsTotal, props.pageSize])

    return (
        <div className="d-flex justify-content-center align-items-center">
            <nav aria-label="users-dashboard-pagination">
                <ul className="pagination">
                    {actualPage === 1 || pages.length === 0 ? (
                        <li className="page-item disabled">
                            <button className="page-link">Anterior</button>
                        </li>
                    ) : (
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    props.handlePageChange(actualPage - 1);
                                }}
                            >
                                Anterior
                            </button>
                        </li>
                    )}
                    {pages.map((pageItem) => {
                        if (
                            pageItem >= 1 &&
                            pageItem < actualPage &&
                            actualPage - pageItem <= 2
                        ) {
                            return (
                                <li key={pageItem} className="page-item">
                                    <button
                                        className="page-link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            props.handlePageChange(pageItem);
                                        }}
                                    >
                                        {pageItem}
                                    </button>
                                </li>
                            );
                        }
                        if (pageItem === actualPage) {
                            return (
                                <li key={pageItem} className="page-item active">
                                    <button className="page-link">
                                        {pageItem}
                                    </button>
                                </li>
                            );
                        }
                        if (
                            pageItem > actualPage &&
                            actualPage - pageItem >= -2
                        ) {
                            return (
                                <li key={pageItem} className="page-item">
                                    <button
                                        className="page-link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            props.handlePageChange(pageItem);
                                        }}
                                    >
                                        {pageItem}
                                    </button>
                                </li>
                            );
                        }
                        return null;
                    })}
                    {actualPage >= pages.length ? (
                        <li className="page-item disabled">
                            <button className="page-link">Siguiente</button>
                        </li>
                    ) : (
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    props.handlePageChange(actualPage + 1);
                                }}
                            >
                                Siguiente
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
