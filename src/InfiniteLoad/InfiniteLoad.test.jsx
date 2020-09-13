import React from 'react';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import InfiniteLoad from './InfiniteLoad';

configure({ adapter: new Adapter() });

describe('<InfiniteLoad />', () => {
    let wrapper;
    const mockLoadMore = jest.fn();

    beforeEach(() => {
        const objects = [<h1 key={0}>test1</h1>, <h1 key={1}>test2</h1>, <h1 key={3}>test3</h1>];
        wrapper = mount(<InfiniteLoad loadMore={mockLoadMore} objects={objects} />);
    });

    it('should contain 3 h1 tags', () => {
        const headers = wrapper.find('h1');
        expect(headers).toHaveLength(3);
    });

    it('should trigger loadMore', () => {
        wrapper.props().loadMore();
        expect(mockLoadMore.mock.calls.length).toBe(1);
    });
});
