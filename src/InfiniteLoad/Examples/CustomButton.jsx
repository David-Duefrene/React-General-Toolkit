import React from 'react';

import InfiniteLoad from '../InfiniteLoad';

let index = 0;
const items = [];

const load = (length = 3) => {
    console.log('loaded items.');
    while (index < length) {
        index += 1;
        items.push(<div style={{ padding: '20%', border: '1px red solid' }}>Hello</div>);
    }
};
load(3);
const button = <h2>Custom Button</h2>;

const CustomButton = () => <InfiniteLoad objects={items} loadMore={load} customButton={button} />;

export default CustomButton;
