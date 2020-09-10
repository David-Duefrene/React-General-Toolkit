import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import CSS from './InfiniteLoad.module.css';

/**
 * Displays a infinite scroll object
 * @extends Component
 * @param {func} loadMore The function to load more items
 * @param {list} objects The objects that is being displayed
 */
const InfiniteLoad = (props) => {
    const { objects, loadMore } = props;

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
    objects: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    loadMore: PropTypes.func.isRequired,
};

export default InfiniteLoad;
