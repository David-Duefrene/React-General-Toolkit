import React from 'react';

import InfiniteScroll from '../InfiniteScroll';

const load = () => {
    let index = 0;
    const items = [];

    while (index < 3) {
        index += 1;
        items.push(<div style={{ padding: '20%', border: '1px red solid' }}>Hello</div>);
    }

    return items;
};

const CustomButton = () => <InfiniteScroll loadMore={load} />;

export default CustomButton;
