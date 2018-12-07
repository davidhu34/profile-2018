import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Container, Transition, Grid, Icon, Item } from 'semantic-ui-react'
import { Spring } from 'react-spring'

class ResumeModal extends Component {
    state = {}
    render() {
        return <iframe width={window.innerWidth*0.8}
        height={window.innerHeight} src={"https://drive.google.com/file/d/1YifEeovKCpf57J0hSkaM8whZBebkLwh3/view?usp=sharing"} />
    }
}
export default ResumeModal
