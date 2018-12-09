import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Icon, Item } from 'semantic-ui-react'
import { Spring } from 'react-spring'

class LinkItem extends Component {
    state = {}

    initStyle = { color: 'rgba(255,255,255,0)' }
    normalStyle = { color: 'rgba(255,255,255,0.5)' }
    hoverStyle = { color: 'rgba(255,255,255,1)' }

    updateHover(hover) {
        this.setState({ hover: hover })
    }

    render() {
        const { key, icon, content, style, onClick, link } = this.props
        const hover = this.state.hover

        return <Item key={key}
            onClick={ (e) => {if (onClick) onClick()} }
            onMouseEnter={(e) => this.updateHover(true)}
            onMouseLeave={(e) => this.updateHover(false)}>
            <Item.Content verticalAlign='middle'>
                <Spring
                    toggle={ hover }
                    from={ this.initStyle }
                    to={ hover? this.hoverStyle: this.normalStyle }
                    children={ styles => (
                        <a onClick={ (e) => {
                                if (link) window.open(link)
                            }}
                            style={{
                                ...styles,
                                ...style,
                            }}>
                                {icon? <Icon name={icon} />: null}
                                {content}
                        </a>
                    )}
                />
            </Item.Content>
        </Item>
    }
}
export default LinkItem
