import ReactDOM from 'react-dom';
import React from 'react';

import InfiniteLoad from './InfiniteLoad/InfiniteLoad';

let index = 0;
const items = [];

const loadItems = (length = 3) => {
    console.log('loaded items.');
    while (index < length) {
        index += 1;
        items.push(<div style={{ padding: '20%' }}>Hello</div>);
    }
};
loadItems(3);

const Index = () => <InfiniteLoad objects={items} loadMore={loadItems} horizontal />;

ReactDOM.render(<Index />, document.getElementById('root'));
