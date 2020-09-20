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
 * @param {bool} horizontal If the component should be displayed horizontally instead of vertically
 */
const InfiniteLoad = (props) => {
    const {
        objects, loadMore, useButtons, button, horizontal,
    } = props;
    const style = horizontal ? CSS.Horizontal : CSS.Vertical;

    // if (useButtons) {
    //     return (
    //         <div>
    //             <ul className={style}>
    //                 {objects}
    //                 {
    //                     button === null
    //                         ? <button type='button' onClick={loadMore}>Load more</button>
    //                         : React.cloneElement(button, { onClick: loadMore })
    //                 }
    //             </ul>
    //         </div>
    //     );
    // }

    const handleScroll = () => {
        const lastLi = document.querySelector(`div > ul.${style}`);
        const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;

        if (pageOffset > lastLiOffset) {
            loadMore();
        }
    };

    const scrollHorizontally = () => {
        const eve = window.event;
        const delta = eve.deltaY || eve.detail || -eve.wheelDelta;
        const lastLi = document.querySelector(`div > ul.${style}`);
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

    return (<div><ul className={style}>{objects}</ul></div>);
};

InfiniteLoad.propTypes = {
    loadMore: PropTypes.func.isRequired,
    objects: PropTypes.arrayOf(PropTypes.element).isRequired,
    useButtons: PropTypes.bool,
    button: PropTypes.element,
    horizontal: PropTypes.bool,
};

InfiniteLoad.defaultProps = {
    useButtons: false,
    horizontal: false,
    button: null,
};

export default InfiniteLoad;
