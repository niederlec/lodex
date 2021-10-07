import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '@material-ui/core';

import { AddFieldFromColumnButton } from './AddFieldFromColumnButton';

describe('<AddFieldFromColumnButton />', () => {
    it('should call onShowExistingColumns on click', () => {
        const onShowExistingColumns = jest.fn();

        const wrapper = shallow(
            <AddFieldFromColumnButton
                onShowExistingColumns={onShowExistingColumns}
                p={{ t: key => key }}
            />,
        );

        expect(wrapper.find(Button).exists()).toBeTruthy();
        wrapper.find(Button).simulate('click');

        expect(onShowExistingColumns).toHaveBeenCalledTimes(1);
    });
});
