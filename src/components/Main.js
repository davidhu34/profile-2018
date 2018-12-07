import React, { Component } from 'react'
import { Responsive } from 'semantic-ui-react'

import Mobile from './Mobile'
import PC from './PC'

const scale = 0.5, fromPercent = 25, toPercent = 100,imageProportion = 1334/1060//3783/3007
class Main extends Component {
    state = {
        width: 0,
        height: 0,
        clipR: 0,
		clipTop: 0,
		clipRight: 0,
    }

    updateDimensions(e) {
        const width = window.innerWidth
        const height = window.innerHeight
        const windowScale = width / height
		const scale = windowScale > imageProportion? windowScale : imageProportion
		const scaleH = height * scale
        const clipR = 0.12 * scaleH
		const clipTop = 0.18 * scaleH
		const clipRight = width - 0.25 * scaleH
        const contentWidth = width - 0.4 * scaleH
        
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
            clipR,
            clipTop,
            clipRight
        });
    }
    componentWillMount() {
    }
    componentDidMount() {
        window.addEventListener("resize",this.updateDimensions.bind(this))
        this.updateDimensions(null);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this), true)
    }

    render() {
        return <div>
            <Responsive maxWidth={Responsive.onlyComputer.minWidth-1}>
                <Mobile  {...this.state} />
            </Responsive>

            <Responsive minWidth={Responsive.onlyComputer.minWidth}>
                <PC {...this.state} />
            </Responsive>
        </div>
    }
}

export default Main
