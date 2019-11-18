import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Transition, Grid, Icon, Item } from 'semantic-ui-react'

import ContactModal from './ContactModal'
import ResumeModal from './ResumeModal'

import { launchModal, closeModal } from '../actions'

class Modal extends Component {
    backgroundStyle = {
        position: 'fixed',
        top: 0,
        left:0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0, 0.5)',
        opacity: '90%',
        overflowY:'scroll',
        zIndex: 90
    }
    contentStyle = {
        width: '100%',
        height: '100%',
        color: 'white',
        textAlign: 'center',
        padding: 'auto',
        zIndex: 91,
    }
    render() {
        const { width, close, mobile, modal } = this.props
        const { open, modalType } = modal
        const modalToShow = modalType == 'CONTACT'? <ContactModal />
            : modalType == 'RESUME'? <ResumeModal />
            : null

        return <Transition visible={open}>
            <div style={this.backgroundStyle}>
                { mobile? <div>
                        {modalToShow}
                    </div>
                : <Grid style={{height:'100%', width: '100%'}}>
                        <Grid.Row>
                            <Grid.Column width={13}>
                                <div style={ this.contentStyle }>
                                    {modalToShow}
                    			</div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                }

                <div
                    style={{
                        position: 'fixed',
                        right: width*0.1,
                        bottom: width*0.1,
                        color:'white'
                    }}
                >
                    <h2 onClick={ () => close() }>Back</h2>
                </div>
            </div>
        </Transition>
    }
}
export default connect(
    ({ modal }) => ({ modal }),
    dispatch => ({
        close: () => dispatch(closeModal())
    })
)(Modal)
