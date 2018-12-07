import PropTypes from 'prop-types'
import React, { Component, Segment } from 'react'
import { Container, Transition, Grid, Icon, Item } from 'semantic-ui-react'
import { Spring } from 'react-spring'

import LinkItem from './LinkItem'

class ContactModal extends Component {
    state = {}

    rows = [{
        key: ' mail',
        icon: 'mail',
        content: 'b01901133@gmail.com',
        link: ''
    },{
        key: ' cell',
        icon: 'call',
        content: '+886937507612',
        link: ''
    },{
        key: 'location',
        icon: "map marker alternate",
        content: 'Taipei, Taiwan',
        link: ''
    },{
        key: 'github',
        icon: 'github',
        content: 'davidhu34',
        link: ''
    }]

    initStyle = { color: 'rgba(255,255,255,0)' }
    normalStyle = { color: 'rgba(255,255,255,0.5)' }
    hoverStyle = { color: 'rgba(255,255,255,1)' }

    render() {
        const { show, close } = this.props

        return <Item.Group>
            <div style={{height: '10rem'}} />
            {this.rows.map(
                row => <div>
                    <LinkItem {...row} />
                    <div style={{height: '5rem'}} />
                </div>
            )}

        </Item.Group>
    }
}
export default ContactModal
