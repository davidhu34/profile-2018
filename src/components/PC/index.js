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

const Home = () => <div>Home Page</div>
const About = () => <div>About content</div>
const Topics = () => <div>Topics content</div>

const scale = 0.5, fromPercent = 25, toPercent = 100,imageProportion = 1334/1060//3783/3007

class PC extends Component {

    parallax = null
    parallaxRef = null
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
        link: 'https://drive.google.com/file/d/1YifEeovKCpf57J0hSkaM8whZBebkLwh3/view?usp=sharing'
    }]
    constructor(props) {
        super(props)
        // this.parallax = React.createRef()
    }

    updateParallaxState(e) {
        const thisIndex = Math.round(this.parallax.current/this.parallax.space);
        if (thisIndex != this.state.parallaxIdx) {
            this.setState({
                parallaxIdx: thisIndex,
                parallaxCurrent: this.parallax.current,
            })
        }
    }

    updateParallaxRef() {
        this.parallaxRef = findDOMNode(this.parallax)
        if (this.parallaxRef) this.parallaxRef.addEventListener("scroll",this.updateParallaxState.bind(this))
    }
    componentDidMount() {
        this.updateParallaxRef();
    }
    componentWillUnmount() {
        if (this.parallaxRef) this.parallaxRef.removeEventListener("scroll",this.updateParallaxState.bind(this))
    }


    scrollToParallax(i) {
        if (this.parallax.scrollTo) this.parallax.scrollTo(i)
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
            fontSize: this.props.height/600 + 'rem',
        }
    })

    parallaxStyle = {
        backgroundColor:'rgba(255,255,255,0.8)',
        // maskImage: '-webkit-linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
        // WebkitMaskImage: '-webkit-linear-gradient(top, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
    }

    render() {
        const {
            router,
            pushRoute,
            launchModal,
            width, height, clipR, clipTop, clipRight
        } = this.props

        const { parallaxIdx } = this.state

        const parallax = this.parallax
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
                    zIndex: -1
                }}
                blur={10} />
            <ImageContainer layer cover
                blur={10}
                fixedBlur={10}
                src={BACKGROUND_URL2}
                placeholderSrc={BACKGROUND_PLACEHOLDER_URL2}
                backgroundStyles={{
                    backgroundPosition: 'top right',
        			height: height*0.2,
                    zIndex: 2,
        			maskImage: '-webkit-linear-gradient(to bottom, rgba(0,0,0,1) '+fromPercent+'%, rgba(0,0,0,0) '+toPercent+'%)',
        			WebkitMaskImage: '-webkit-linear-gradient(top, rgba(0,0,0,1) '+fromPercent+'%, rgba(0,0,0,0) '+toPercent+'%)',
                }} />
            <ImageContainer layer cover
                blur={10}
                src={BACKGROUND_URL2}
                placeholderSrc={BACKGROUND_PLACEHOLDER_URL2}
                backgroundStyles={{
                    backgroundPosition: 'top right',
                    zIndex: 3,
                    clipPath: 'circle('+clipR+'px at '+clipRight+'px '+clipTop+'px)',
                }} />


            <div style={{
                position: 'fixed',
                top: 0,
                right: (width - clipRight - clipR) || 0,
                width: clipR*2,
                height: '100%',
                paddingTop: clipR+clipTop,
                color: parallaxIdx > 0? 'rgb(100,100,100)': '#ffffff',
                textAlign: 'center',
                zIndex:3
            }}>
                <Item.Group relaxed>
                    <Divider hidden /><Divider hidden />
                    <LinkItem style={{ color: parallaxIdx > 0? 'rgb(100,100,100)': 'transparent'}}
                        {...this.sideContent[0]} />
                    <LinkItem {...this.sideContent[1]}
                        onClick={ (e) => launchModal('CONTACT') }
                        style={{ color: parallaxIdx > 0? 'rgb(100,100,100)': '#ffffff' }} />
                    <LinkItem {...this.sideContent[2]}
                        // onClick={ (e) => launchModal('RESUME') }
                        style={{ color: parallaxIdx > 0? 'rgb(100,100,100)': '#ffffff' }} />
                </Item.Group>
            </div>



            <div style={{
                zIndex: 1,
                filter: this.props.modal.open? 'blur(20px)': ''
            }}>
                <Parallax ref={ ref => { this.parallax = ref } } pages={7}>
                <Grid onScroll={(e) => this.updateParallaxState(e)} >
                <Grid.Row>
                <Grid.Column style={{
                    textAlign: 'center',
                }}>
                    <Parallax.Layer offset={0} speed={0.5} style={{
                        width: clipRight - clipR,
                    }}>
                        <div style={{
                            fontSize: width/250+'rem',
                            textAlign: 'center',
                            color: '#ffffff',
                            paddingTop: clipTop*1.8,
                        }}>
                            {'Ming Wei Hu '}
                        </div>
                        <div style={{
                            fontSize: width/500+'rem',
                            textAlign: 'center',
                            color: '#ffffff',
                            paddingTop: '8rem',
                        }}>
                            {'Software Engineer'}
                        </div>
                    </Parallax.Layer>

                    <Parallax.Layer
                        offset={1}
                        speed={-0.1}
                        onClick={(e) => this.scrollToParallax(2)}
                        style={this.parallaxStyle}>

                        <Grid style={{
                            paddingTop: clipTop,
                            width: clipRight - clipR,
                        }}>
                            <Container textAlign={'center'} style={{ fontSize:  height/600+'rem' }}>
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
                        </Grid>
                    </Parallax.Layer>

                    <Parallax.Layer
                        offset={2}
                        speed={0.5}
                        onClick={(e) => this.scrollToParallax(3)}
                        style={this.parallaxStyle}>
                        <Grid style={{
                            paddingTop: clipTop,
                            width: clipRight - clipR,
                        }}>
                            <Container style={{ fontSize: height/600+'rem' }}>

                                <Timeline orientation={'right'} lineStyle={{ backgroundColor: 'grey' }}>
                                    <TimelineEvent title="2015" {...this.timelineEventProps()}>
                                        <Icon name={'microsoft'} /> Internship at Microsoft M&O Cloud & Enterprise
                                    </TimelineEvent>
                                    <TimelineEvent title="2016-2017" {...this.timelineEventProps()}>
                                        <Icon name={'graduation'} /> Graduted from NTUEE
                                        <br />
                                        <br />
                                        <Image spaced inline src={'images/watson.png'}
                                            width={30}
                                            height={30}/>
                                        Internship at IBM Cloud Team
                                        <br />
                                        <br />
                                        <Icon name={'rocket'} />
                                        NASA Space App Challenge - Magic Conch
                                    </TimelineEvent>
                                    <TimelineEvent title="2018" {...this.timelineEventProps()}>

                                      IBM Employee
                                    </TimelineEvent>
                                </Timeline>

                            </Container>
                        </Grid>
                    </Parallax.Layer>

                    <Parallax.Layer
                        offset={3}
                        speed={0.1}
                        onClick={(e) => this.scrollToParallax(4)}
                        style={this.parallaxStyle}>
                        <Grid style={{
                            paddingTop: clipTop,
                            width: clipRight - clipR,
                        }}>
                            <Container textAlign={'center'} style={{ fontSize:  height/600+'rem' }}>
                                <p>{'My experience through 2 cloud team internships...'}</p>

                                <p>{'Cloud Service POCs | IoT POCs | Event Lecturer | Official Blog Editor'}</p>

                                <Divider hidden />
                                <Image spaced inline width={clipTop} src={'images/ms.png'} />
                                <Image spaced inline width={clipTop} src={'images/ibmday.png'} />
                                <Divider hidden />
                            </Container>
                        </Grid>
                    </Parallax.Layer>

                    <Parallax.Layer
                        offset={4}
                        speed={0.1}
                        onClick={(e) => this.scrollToParallax(5)}
                        style={this.parallaxStyle}>
                        <Grid style={{
                            paddingTop: clipTop,
                            width: clipRight - clipR,
                        }}>
                            <Container text textAlign={'center'} style={{ fontSize:  height/600+'rem' }}>

                                <p>{'My IBM mentor and I build chat bots of all shape and sizes. (APPs, cardboards, humanoids, VR...) '}</p>

                                <Divider hidden />
                                <Image spaced inline src={'images/reception.png'} />
                                <Divider hidden />

                                <p>{'One of our bot even hosted the office reception for a couple of month!'}</p>
                            </Container>
                        </Grid>
                    </Parallax.Layer>



                    <Parallax.Layer
                        offset={5}
                        speed={0.1}
                        onClick={(e) => this.scrollToParallax(0)}
                        style={this.parallaxStyle}>
                        <Grid style={{
                            paddingTop: clipTop,
                            width: clipRight - clipR,
                        }}>
                            <Container text textAlign={'center'} style={{ fontSize:  height/600+'rem' }}>

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
                        </Grid>
                    </Parallax.Layer>




                    <Parallax.Layer
                        offset={6}
                        speed={0.1}
                        onClick={(e) => this.scrollToParallax(0)}
                        style={this.parallaxStyle}>
                        <Grid style={{
                            paddingTop: clipTop,
                            width: clipRight - clipR,
                        }}>
                            <Container text textAlign={'center'} style={{ fontSize:  height/600+'rem' }}>

                                <p>{'I\'m currenly working as Business Transform Consultant and Full-stack Application Developer.'}</p>
                                <p>{'Our projects face clients from major banking industries.'}</p>

                                <Divider hidden /><Divider hidden />
                                <Icon name={'laptop'} />
                                <Divider hidden /><Divider hidden />

                                <p>{'Nice to meet you!'}</p>
                                <p>{'Feel free to contact me in any form.'}</p>

                            </Container>
                        </Grid>
                    </Parallax.Layer>



                </Grid.Column>
                </Grid.Row>
                </Grid>
                </Parallax>
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
)(PC)
