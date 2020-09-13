import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import CSS from './InfiniteLoad.module.css';

/**
 * Displays a infinite scroll object
 * @extends Component
 * @param {func} loadMore The function to load more items
 * @param {list} objects The list of objects that is being displayed
 * @param {bool} useButtons If a button should be displayed
 * @param {element} button The button to be displayed
 */
const InfiniteLoad = (props) => {
    const {
        objects, loadMore, useButtons, button,
    } = props;

    if (useButtons) {
        return (
            <div className={CSS.Content}>
                <ul>
                    {objects}
                </ul>
                {
                    button === null
                        ? <button type='button' onClick={loadMore}>Load more</button>
                        : button
                }
            </div>
        );
    }

    const handleScroll = () => {
        const lastLi = document.querySelector(`div > div.${CSS.Content}`);
        const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;

        if (pageOffset > lastLiOffset) {
            loadMore();
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', (e) => handleScroll(e));
    });

    return (<div className={CSS.Content}><ul>{objects}</ul></div>);
};

InfiniteLoad.propTypes = {
    loadMore: PropTypes.func.isRequired,
    objects: PropTypes.arrayOf(PropTypes.element).isRequired,
    useButtons: PropTypes.bool,
    button: PropTypes.element,
};

InfiniteLoad.defaultProps = {
    useButtons: false,
    button: null,
};

export default InfiniteLoad;
