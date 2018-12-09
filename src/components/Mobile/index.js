import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { Button, Grid, Segment, Container, Icon, Item, Divider, Image } from 'semantic-ui-react'
import { Timeline, TimelineEvent } from "react-event-timeline";

import { Parallax } from 'react-spring'

import { pushRoute, launchModal } from '../../actions'
import { TITLE } from '../../consts'
import { BACKGROUND_URL, BACKGROUND_PLACEHOLDER_URL,BACKGROUND_URL2, BACKGROUND_PLACEHOLDER_URL2 } from '../../configs'

import Counter from '../Counter'
import Modal from '../Modal'
import ImageContainer from '../ImageContainer'
import LinkItem from '../LinkItem'

const scale = 0.5, fromPercent = 50, toPercent = 100,imageProportion = 1334/1060//3783/3007

class Mobile extends Component {

    parallax = null
    parallaxRef = null
    contentSlideRef = null
    state = {}

    sideContent = [{
        key: ' name',
        icon: '',
        content: 'MING WEI HU',
        link: ''
    },{
        key: ' Contact',
        icon: '',
        content: 'contact',
        link: ''
    },{
        key: 'Resume',
        icon: '',
        content: 'Resume',
        link: 'https://drive.google.com/file/d/1Gog335_I4mFYj6erSJqo_7jcZa1RSPmC/view'
    }]

    componentDidMount() {
        this.contentSlideRef = findDOMNode(this.contentSlide)
        if (this.contentSlideRef) this.contentSlideRef.addEventListener("scroll",this.handleScroll.bind(this))
    }
    componentWillUnmount() {
        if (this.contentSlideRef) this.contentSlideRef.removeEventListener("scroll",this.handleScroll.bind(this))
    }

    handleScroll(e) {
        if (e.target.scrollTop > this.props.clipTop + this.props.clipR) {
            if (!this.state.withinContent)this.setState({
                withinContent: true
            })
        } else if (this.state.withinContent) {
            this.setState({
                withinContent: false
            })
        }
    }

    timelineEventProps = () => ({
        bubbleStyle: {
            color: 'grey',
            backgroundColor: 'grey',
            borderColor: 'grey'
        },
        contentStyle: {
            backgroundColor: 'transparent',
            boxShadow:'none',
            fontSize: this.props.width/500 + 'rem',
        }
    })


    render() {
        const {
            router,
            pushRoute,
            launchModal,
            width, height, clipR, clipTop,
            modal
        } = this.props

        const clipRight = width*0.5

        const {  withinContent } = this.state

        const size1 = width/200+'rem'
        const size2 = width/250+'rem'
        const size3 = width/400+'rem'

        const contentPadding = {
            height: height*1.3,
            fontSize: size3,
            paddingTop: height*0.3,
        }

        const clipPath = withinContent
            ? 'circle('+height*0.07+'px at '+(width-height*0.13)+'px '+height*0.11+'px)'
            :'circle('+clipR+'px at '+clipRight+'px '+clipTop+'px)'
        return <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        }}>
            <ImageContainer layer cover
                src={BACKGROUND_URL2}
                fixedBlur={20}
                placeholderSrc={BACKGROUND_PLACEHOLDER_URL2}
                backgroundStyles={{
                    backgroundPosition: 'top right',
                    fliter: 'blur(20)',
                    zIndex: -2
                }}
                blur={10} />
            <ImageContainer layer cover
                blur={10}
                fixedBlur={10}
                src={BACKGROUND_URL2}
                placeholderSrc={BACKGROUND_URL2}
                backgroundStyles={{
                    backgroundPosition: 'top right',
        			height: height*0.3,
                    zIndex: withinContent? 2: -3,
        			maskImage: '-webkit-linear-gradient(to bottom, rgba(0,0,0,1) '+fromPercent+'%, rgba(0,0,0,0) '+toPercent+'%)',
        			WebkitMaskImage: '-webkit-linear-gradient(top, rgba(0,0,0,1) '+fromPercent+'%, rgba(0,0,0,0) '+toPercent+'%)',
                }} />
            { modal.open
                ? null
                : <ImageContainer layer cover
                    blur={10}
                    src={BACKGROUND_URL2}
                    placeholderSrc={BACKGROUND_PLACEHOLDER_URL2}
                    backgroundStyles={{
                        backgroundPosition: 'top right',
                        zIndex: 3,
            			height: withinContent? height*0.3: height,
                        clipPath: clipPath,
                        WebkitClipPath: clipPath,
                    }} />
            }


            { withinContent && !modal.open
                ? <div style={{
                    position: 'fixed',
                    zIndex:5,
                    left: 50,
                    color: 'white',
                    textShadow: '0 0 100px black',
                    fontSize: size2,
                    fontWeight: 900,
                }}>

                    <div style={{
                        paddingTop: height*0.1,
                    }}>
                        {this.sideContent[0].content}
                    </div>
                    <div style={{
                        paddingTop: height*0.05,
                        textShadow: '0 0 100px black',
                        display: 'auto'
                    }} onClick={ (e) => launchModal('CONTACT') }>
                        {this.sideContent[1].content}
                    </div>

                    <div style={{
                        paddingTop: height*0.02,
                        textShadow: '0 0 100px black',
                        display: 'auto'
                    }} onClick={ (e) => {
                        const link = this.sideContent[2].link
                        if (link) window.open(link)
                    }}>
                        {this.sideContent[2].content}
                    </div>
                </div>
                : null
            }

            <div ref={ ref => { this.contentSlide = ref }} style={{
                textAlign: 'center',
                overflowY: 'scroll',
                overflowX: 'hidden',
                height: height,
                zIndex: 0,
                filter: this.props.modal.open? 'blur(20px)': '',
            }}>
                <div style={{
                    height: height-50
                }}>
                    <div style={{
                        color: '#ffffff',
                        fontSize: size1,
                        paddingTop: height*0.5,
                    }}>
                        {'Ming Wei Hu '}
                    </div>
                    <div style={{
                        color: '#ffffff',
                        fontSize: size2,
                        paddingTop: size1,
                    }}>
                        {'Software Engineer'}
                    </div>
                    <Item.Group relaxed>
                        <Divider hidden /><Divider hidden />
                        <LinkItem style={{
                                color: withinContent? 'rgb(100,100,100)': 'transparent',
                                fontSize: size2,
                            }}
                            {...this.sideContent[0]} />
                        <LinkItem {...this.sideContent[1]}
                            onClick={ (e) => launchModal('CONTACT') }
                            style={{
                                color: withinContent? 'rgb(100,100,100)': '#ffffff',
                                fontSize: size2,
                             }} />
                        <LinkItem {...this.sideContent[2]}
                            // onClick={ (e) => launchModal('RESUME') }
                            style={{
                                color: withinContent? 'rgb(100,100,100)': '#ffffff',
                                fontSize: size2,
                            }} />
                    </Item.Group>

                </div>


                <div style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}>
                <Grid textAlign={'center'} style={{
                    fontSize:  size3,
                }}>

                    <Container style={{ ...contentPadding }}>
                        <p>{'Hi, I\'m Ming-Wei Hu (胡明衛) from Taiwan,'}</p>

                        <p>{'an IBMer since 2017.'}</p>

                        <Divider hidden />
                        <Divider hidden />
                        <Icon name={'desktop'} />
                        <Icon size={'tiny'}/>
                        <br/>
                        <Icon name={'keyboard outline'} />
                        <Icon size={'tiny'} flipped={'vertically'} name={'mobile'} />
                        <Divider hidden />
                        <Divider hidden />

                        <p>{'Front-end development consists the majority of my work.'}</p>
                        <p>{'IoT and cloud Applications are my fields of interests.'}</p>
                        <p>{'I\'m enthusiastic about programming and user experience.'}</p>

                        <p>{'I admire creativiy.'}</p>
                    </Container>

                    <Container style={{ ...contentPadding }}>

                        <Timeline orientation={'right'} lineStyle={{ backgroundColor: 'grey' }}>
                            <TimelineEvent title="2015" {...this.timelineEventProps()}>
                                <Icon name={'microsoft'} /> Internship at Microsoft<br/>M&O Cloud & Enterprise
                            </TimelineEvent>
                            <TimelineEvent title="2016-2017" {...this.timelineEventProps()}>
                                <Icon name={'graduation'} /> Graduted from NTUEE
                                <br />
                                <br />
                                <Image spaced inline src={'images/watson.png'}
                                    width={30}
                                    height={30}/>
                                Internship at IBM <br/>Cloud Team
                                <br />
                                <br />
                                <Icon name={'rocket'} />
                                NASA Space App Challenge <br/>- Magic Conch
                            </TimelineEvent>
                            <TimelineEvent title="2018" {...this.timelineEventProps()}>

                              IBM Employee
                            </TimelineEvent>
                        </Timeline>

                    </Container>
                    <Container style={{ ...contentPadding }}>
                        <p>{'My experience through 2 cloud team internships...'}</p>

                        <p>{'Cloud Service POCs | IoT POCs | Event Lecturer | Official Blog Editor'}</p>

                        <Divider hidden />
                        <Image spaced inline width={clipTop} src={'images/ms.png'} />
                        <Image spaced inline width={clipTop} src={'images/ibmday.png'} />
                        <Divider hidden />
                    </Container>

                    <Container style={{ ...contentPadding }}>
                        <p>{'My IBM mentor and I build chat bots of all shape and sizes. (APPs, cardboards, humanoids, VR...) '}</p>

                        <Divider hidden />
                        <Image spaced inline src={'images/reception.png'} />
                        <Divider hidden />

                        <p>{'One of our bot even hosted the office reception for a couple of month!'}</p>
                    </Container>

                    <Container style={{ ...contentPadding }}>
                        <p>{'During 2017 NASA SpaceApp Challenge, my friends and I had a blast in the world\'s biggest hackathon!'}</p>

                        <Divider hidden />
                        <Image spaced inline
                            onClick={ (e) => { window.open('https://2017.spaceappschallenge.org/challenges/earth-and-us/lets-go-beach/teams/magic-conch') } }
                            src={'images/magicconch.png'}
                            label={{
                                as: 'a', color: 'blue',
                                content: 'check out the offical project page!',
                                icon: 'linkify',
                                ribbon: true
                            }}/>
                        <Divider hidden />

                        <p><Icon name={'trophy'} />{'We were 2nd place in Taiwan;'}</p>
                        <p><Icon name={'trophy'} />{'Top 5 global finalist (Best Use of Data).'}</p>

                    </Container>

                    <Container style={{
                        ...contentPadding,
                        height: height,
                    }}>
                        <p>{'I\'m currenly working as Business Transform Consultant and Full-stack Application Developer.'}</p>
                        <p>{'Our projects face clients from major banking industries.'}</p>

                        <Divider hidden /><Divider hidden />
                        <Icon name={'laptop'} />
                        <Divider hidden /><Divider hidden />

                        <p>{'Nice to meet you!'}</p>
                        <p>{'Feel free to contact me in any form.'}</p>

                    </Container>

                </Grid>
                </div>

            </div>


            <Modal width={width}/>
        </div>
    }
}
export default connect(
	({ router, modal }) => ({ router, modal }),
    dispatch => ({
        launchModal: (modalType, data) => dispatch(launchModal({modalType, data})),
        pushRoute: (route) => dispatch(pushRoute(route))
    })
)(Mobile)
