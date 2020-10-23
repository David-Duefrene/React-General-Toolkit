/**
 * @module InfiniteScroll
 * @exports InfiniteScroll
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import CSS from './InfiniteScroll.module.css';

/**
 * Displays a infinite scroll object
 * @component
 * @requires react
 * @requires prop-types
 * @author David Duefrene
 */
const InfiniteScroll = (props) => {
    const { loadMore, horizontal } = props;
    const [objects, setObjects] = useState(loadMore());
    /**
     * If the list should be displayed horizontally or vertically
     * @const
     * @type {CSS}
     * @default [Vertical]
     */
    const listStyle = horizontal ? CSS.Horizontal : CSS.Vertical;

    /**
     * Handles the vertical scroll
     * @const
     * @type {function}
     */
    const scrollVertically = () => {
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
            setObjects(objects.concat(loadMore()));
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
            setObjects(objects.concat(loadMore()));
        }

        document.documentElement.scrollLeft += (delta * 40);
        eve.preventDefault();
    };

    useEffect(() => {
        if (horizontal) {
            window.addEventListener('wheel', scrollHorizontally, false);
            return;
        }
        window.addEventListener('scroll', (e) => scrollVertically(e));
    });

    return (
        <div className={horizontal ? CSS.Element : null}>
            <ul id='InfiniteLoad' className={listStyle}>
                {objects}
            </ul>
        </div>
    );
};

InfiniteScroll.propTypes = {
    /**
    * loadMore The function to load more items
    */
    loadMore: PropTypes.func.isRequired,
    /**
    * horizontal If the component should be displayed horizontally instead of vertically
    */
    horizontal: PropTypes.bool,
};

InfiniteScroll.defaultProps = { horizontal: false };

export default InfiniteScroll;
