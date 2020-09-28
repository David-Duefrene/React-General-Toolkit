import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import CSS from './InfiniteLoad.module.css';

/**
 * Displays a infinite scroll object
 * @extends Component
 * @param {func} loadMore The function to load more items
 * @param {list} objects The list of objects that is being displayed
 * @param {bool} useButtons If a button should be displayed
 * @param {element} customButton The button to be displayed
 * @param {bool} horizontal If the component should be displayed horizontally instead of vertically
 */
const InfiniteLoad = (props) => {
    const {
        objects, loadMore, useButtons, customButton, horizontal,
    } = props;
    const listStyle = horizontal ? CSS.Horizontal : CSS.Vertical;
    const buttonStyle = horizontal ? CSS.ButtonHor : CSS.ButtonVert;
    let button = customButton !== null ? customButton : null;

    const handleScroll = () => {
        const lastLi = document.querySelector(`div > ul.${listStyle}`);
        const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;

        if (pageOffset > lastLiOffset) {
            loadMore();
        }
    };

    const scrollHorizontally = () => {
        const eve = window.event;
        const delta = eve.deltaY || eve.detail || -eve.wheelDelta;
        const lastLi = document.querySelector(`div > ul.${listStyle}`);
        const lastLiOffset = lastLi.offsetLeft - lastLi.clientWidth;
        const pageOffset = window.pageXOffset - window.innerWidth;

        if (pageOffset > lastLiOffset) {
            loadMore();
        }

        document.documentElement.scrollLeft += (delta * 40);
        eve.preventDefault();
    };

    useEffect(() => {
        if (horizontal) {
            window.addEventListener('wheel', scrollHorizontally, false);
            return;
        }
        window.addEventListener('wheel', (e) => handleScroll(e));
    });

    if (useButtons && button === null) {
        button = (
            <button className={buttonStyle} type='button' onClick={loadMore}>
                Load more
            </button>
        );
    }

    return (
        <div className={horizontal ? CSS.Element : null}>
            <ul className={listStyle}>
                {objects}
            </ul>
            {
                customButton !== null
                    ? React.cloneElement(customButton, { onClick: loadMore }) : button
            }
        </div>
    );
};

InfiniteLoad.propTypes = {
    loadMore: PropTypes.func.isRequired,
    objects: PropTypes.arrayOf(PropTypes.element).isRequired,
    useButtons: PropTypes.bool,
    customButton: PropTypes.element,
    horizontal: PropTypes.bool,
};

InfiniteLoad.defaultProps = {
    useButtons: false,
    horizontal: false,
    customButton: null,
};

export default InfiniteLoad;
