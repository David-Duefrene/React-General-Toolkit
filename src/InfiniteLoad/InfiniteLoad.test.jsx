import React from 'react';

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import InfiniteLoad from './InfiniteLoad';

configure({ adapter: new Adapter() });

const objects = [<h1 key={0}>test1</h1>, <h1 key={1}>test2</h1>, <h1 key={3}>test3</h1>];
const mockLoadMore = jest.fn();

describe('<InfiniteLoad /> with no buttons', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<InfiniteLoad loadMore={mockLoadMore} objects={objects} />);
    });

    afterEach(() => {
        mockLoadMore.mockClear();
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

describe('<InfiniteLoad /> with default button', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<InfiniteLoad loadMore={mockLoadMore} objects={objects} useButtons />);
    });

    afterEach(() => {
        mockLoadMore.mockClear();
    });

    it('should show button if useButtons is true', () => {
        const button = wrapper.find('button');
        expect(button).toHaveLength(1);
    });

    it('should trigger loadMore if button is pressed', () => {
        const button = wrapper.find('button');
        button.simulate('click');
        expect(mockLoadMore.mock.calls.length).toBe(1);
    });
});

describe('<InfiniteLoad /> with custom button', () => {
    let wrapper;
    const customButton = <h2>Custom Button</h2>;

    beforeEach(() => {
        wrapper = shallow(
            <InfiniteLoad
                loadMore={mockLoadMore}
                objects={objects}
                useButtons
                button={customButton}
            />,
        );
    });

    afterEach(() => {
        mockLoadMore.mockClear();
    });

    it('should show custom button if button is provided', () => {
        const button = wrapper.find('h2');
        expect(button).toHaveLength(1);
    });

    it('should trigger loadMore if button is pressed', () => {
        const button = wrapper.find('h2');
        button.simulate('click');
        expect(mockLoadMore.mock.calls.length).toBe(1);
    });
});

describe('<InfiniteLoad /> should work horizontal', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <InfiniteLoad
                loadMore={mockLoadMore}
                objects={objects}
                useButtons
                horizontal
            />,
        );
    });

    afterEach(() => {
        mockLoadMore.mockClear();
    });

    it('should show custom button if button is provided', () => {
        const button = wrapper.find('h1');
        expect(button).toHaveLength(3);
    });

    it('should trigger loadMore if button is pressed', () => {
        const button = wrapper.find('button');
        button.simulate('click');
        expect(mockLoadMore.mock.calls.length).toBe(1);
    });
});
