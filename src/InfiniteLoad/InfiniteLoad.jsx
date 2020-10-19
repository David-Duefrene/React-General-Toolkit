/**
 * @module InfiniteLoad
 * @exports InfiniteLoad
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import CSS from './InfiniteLoad.module.css';

/**
 * Displays a infinite scroll object
 * @component
 * @requires react
 * @requires prop-types
 * @author David Duefrene
 */
const InfiniteLoad = (props) => {
    const {
        objects, loadMore, useButtons, customButton, horizontal,
    } = props;
    /**
     * If the list should be displayed horizontally or vertically
     * @const
     * @type {CSS}
     * @default [Vertical]
     */
    const listStyle = horizontal ? CSS.Horizontal : CSS.Vertical;
    /**
     * The Style of the button
     * @const
     * @type {CSS}
     */
    const buttonStyle = horizontal ? CSS.ButtonHor : CSS.ButtonVert;
    /**
     * The button itself
     * @type {HTMLElement}
     */
    let button = customButton !== null ? customButton : null;

    /**
     * Handles the vertical scroll
     * @const
     * @type {function}
     */
    const handleScroll = () => {
        /**
         * Last item in the list
         * @const
         * @type {HTMLElement}
         * TODO Make lastLi in upper scope
         */
        const lastLi = document.querySelector(`div > ul.${listStyle}`);
        /**
         * The location of the last item in the list
         * @const
         * @type {float}
         */
        const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
        /**
         * The location of the current item/s in view in the list
         * @const
         * @type {float}
         */
        const pageOffset = window.pageYOffset + window.innerHeight;

        if (pageOffset > lastLiOffset) {
            loadMore();
        }
    };

    /**
     * Handles the horizontal scroll
     * @const
     * @type {function}
     */
    const scrollHorizontally = () => {
        /**
         * The Window event
         * @const
         * @type {event}
         */
        const eve = window.event;
        /**
         * How much the user scrolled
         * @const
         * @type {float}
         */
        const delta = eve.deltaY || -eve.wheelDelta;
        /**
         * Last item in the list
         * @const
         * @type {HTMLElement}
         * TODO Make lastLi in upper scope
         */
        const lastLi = document.querySelector(`div > ul.${listStyle}`);
        /**
         * The location of the last item in the list
         * @const
         * @type {float}
         */
        const lastLiOffset = lastLi.offsetLeft - lastLi.clientWidth;
        /**
         * The location of the current item/s in view in the list
         * @const
         * @type {float}
         */
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

    // If component is using buttons and a custom button has not been provided use HTML button
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
    /**
    * loadMore The function to load more items
    */
    loadMore: PropTypes.func.isRequired,
    /**
    * objects The list of objects that is being displayed
    */
    objects: PropTypes.arrayOf(PropTypes.element).isRequired,
    /**
    * useButtons If a button should be displayed
    */
    useButtons: PropTypes.bool,
    /**
    * customButton The button to be displayed
    */
    customButton: PropTypes.element,
    /**
    * horizontal If the component should be displayed horizontally instead of vertically
    */
    horizontal: PropTypes.bool,
};

InfiniteLoad.defaultProps = {
    useButtons: false,
    horizontal: false,
    customButton: null,
};

export default InfiniteLoad;
