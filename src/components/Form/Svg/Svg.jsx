import React from 'react'
const defaultAlt = 'Scalable vector graphic'

export default class Svg extends React.Component {
  render () {
    // Append on any classes passed down
    const klass = `svg ${this.props.className || ''}`.trim()

    // See if this is one of those special use-cases needing CSS wizardry
    const pixie = dust[this.props.src]
    if (pixie) {
      return pixie(this.props)
    }

    // When there is nothing special do the status quo
    return (
      <img src={this.props.src} alt={this.props.alt || defaultAlt} className={klass} />
    )
  }
}

const dust = {
  '/img/info.svg': (props) => {
    return (
      <svg alt={props.alt || defaultAlt} tabIndex="-1" focusable="false" width="14.57px" height="14.57px" viewBox="0 0 14.57 14.57">
        <g>
          <path className="eapp-help-icon" d="M13.59,3.63c0.65,1.12,0.98,2.34,0.98,3.66s-0.33,2.54-0.98,3.66c-0.65,1.12-1.54,2-2.65,2.65
                                              s-2.33,0.98-3.66,0.98c-1.32,0-2.54-0.33-3.66-0.98s-2-1.54-2.65-2.65C0.33,9.83,0,8.61,0,7.29s0.33-2.54,0.98-3.66
                                              c0.65-1.12,1.54-2,2.65-2.65S5.96,0,7.29,0c1.32,0,2.54,0.33,3.66,0.98S12.94,2.51,13.59,3.63z M10.93,5.46
                                              c0-0.56-0.18-1.07-0.53-1.55c-0.35-0.47-0.79-0.84-1.31-1.1C8.56,2.56,8.03,2.43,7.48,2.43c-1.54,0-2.71,0.67-3.52,2.02
                                              C3.86,4.6,3.89,4.73,4.03,4.85L5.28,5.8c0.04,0.04,0.1,0.06,0.18,0.06c0.1,0,0.18-0.04,0.24-0.11c0.33-0.43,0.61-0.72,0.82-0.87
                                              C6.73,4.71,7,4.64,7.33,4.64c0.3,0,0.57,0.08,0.81,0.25C8.38,5.05,8.5,5.24,8.5,5.45c0,0.24-0.06,0.43-0.19,0.58
                                              C8.18,6.17,7.97,6.31,7.67,6.45C7.27,6.63,6.9,6.9,6.57,7.27c-0.33,0.37-0.5,0.77-0.5,1.19V8.8c0,0.09,0.03,0.16,0.09,0.22
                                              c0.06,0.06,0.13,0.09,0.22,0.09H8.2c0.09,0,0.16-0.03,0.22-0.09C8.47,8.96,8.5,8.89,8.5,8.8c0-0.12,0.07-0.28,0.2-0.47
                                              c0.14-0.19,0.31-0.35,0.52-0.47c0.2-0.11,0.36-0.21,0.46-0.27s0.25-0.18,0.44-0.33c0.18-0.15,0.32-0.31,0.42-0.46
                                              c0.1-0.15,0.19-0.34,0.27-0.57C10.89,6,10.93,5.74,10.93,5.46z M8.5,11.84v-1.82c0-0.09-0.03-0.16-0.08-0.22
                                              C8.36,9.74,8.29,9.71,8.2,9.71H6.38c-0.09,0-0.16,0.03-0.22,0.08C6.1,9.86,6.07,9.93,6.07,10.02v1.82c0,0.09,0.03,0.16,0.09,0.22
                                              c0.06,0.06,0.13,0.08,0.22,0.08H8.2c0.09,0,0.16-0.03,0.22-0.08C8.47,12,8.5,11.93,8.5,11.84z"/>
        </g>
      </svg>
    )
  },
  '/img/bald.svg': (props) => {
    return (
      <svg alt={props.alt || defaultAlt} tabIndex="-1" focusable="false" viewBox="0 0 18.01 30.87">
        <path d="M11.571,30.953h-1.328L10.04,30.9c-0.377-0.188-0.754-0.378-1.226-0.566l0.371-0.928
                 c0.018,0.007,0.035,0.014,0.051,0.021c-0.007-0.018-0.014-0.034-0.021-0.052l0.928-0.371c0.173,0.431,0.351,0.877,0.569,1.095
                 L11.571,30.953z"/>
        <path d="M6.4,28.932c-0.853-0.538-1.63-1.108-2.31-1.696l0.653-0.756c0.643,0.555,1.379,1.095,2.189,1.606L6.4,28.932
                 z M2.102,25.136c-0.599-0.789-1.088-1.638-1.456-2.521L1.57,22.23c0.334,0.806,0.782,1.58,1.329,2.302L2.102,25.136z
                 M-0.118,19.807c-0.086-0.607-0.13-1.244-0.13-1.893c0-0.352,0.018-0.688,0.053-1.013l0.994,0.107
                 c-0.031,0.289-0.047,0.591-0.047,0.905c0,0.602,0.041,1.19,0.121,1.752L-0.118,19.807z M1.53,14.525l-0.891-0.454
                 c0.418-0.819,0.987-1.591,1.739-2.36l0.715,0.699C2.413,13.105,1.901,13.797,1.53,14.525z M5.152,10.626L4.537,9.838l0.451-0.35
                 c0.61-0.472,1.186-0.918,1.697-1.38L7.355,8.85c-0.54,0.488-1.13,0.946-1.756,1.43L5.152,10.626z M9.168,6.477L8.243,6.095
                 C8.416,5.677,8.5,5.25,8.5,4.791c0-0.332-0.05-0.744-0.138-1.13l0.975-0.222C9.44,3.895,9.5,4.388,9.5,4.791
                 C9.5,5.375,9.388,5.943,9.168,6.477z"/>
        <path d="M7.855,1.963C7.666,1.491,7.478,1.018,7.289,0.64L6.928-0.083h0.927l0.203,0.053
                 c0.381,0.19,0.757,0.379,1.226,0.566L8.912,1.464C8.838,1.435,8.767,1.405,8.697,1.376C8.726,1.448,8.755,1.52,8.784,1.592
                 L7.855,1.963z"/>
        <path d="M8.667,27.461C8.556,27.004,8.5,26.539,8.5,26.079c0-0.576,0.104-1.134,0.31-1.656l0.931,0.365
                 C9.579,25.2,9.5,25.622,9.5,26.079c0,0.381,0.046,0.767,0.138,1.147L8.667,27.461z M11.267,22.762l-0.676-0.738
                 c0.563-0.516,1.186-0.994,1.845-1.501l0.361-0.278l0.611,0.791l-0.363,0.28C12.404,21.809,11.798,22.274,11.267,22.762z
                 M15.579,19.179l-0.709-0.705c0.687-0.688,1.203-1.375,1.581-2.1l0.887,0.463C16.913,17.652,16.337,18.418,15.579,19.179z
                 M18.191,14.012l-0.994-0.112c0.034-0.301,0.052-0.615,0.052-0.943c0-0.585-0.038-1.162-0.111-1.714l0.99-0.133
                 c0.08,0.596,0.121,1.217,0.121,1.847C18.249,13.323,18.229,13.675,18.191,14.012z M16.469,8.668
                 c-0.326-0.812-0.763-1.59-1.299-2.315l0.803-0.595c0.588,0.793,1.066,1.646,1.424,2.538L16.469,8.668z M13.345,4.394
                 c-0.638-0.558-1.372-1.099-2.182-1.61l0.533-0.846c0.854,0.539,1.63,1.112,2.307,1.703L13.345,4.394z"/>
      </svg>
    )
  },
  '/img/hair.svg': (props) => {
    return (
      <svg alt={props.alt || defaultAlt} tabIndex="-1" focusable="false" viewBox="0 0 18 32" enableBackground="new 0 0 18 32">
        <path d="M9,26.37c0,1.41,0.7,3.28,1.35,4.5l-0.08-0.02l0.02,0.02C4.74,28.32,0,24.8,0,18.01c0-7.7,9-8.38,9-13.5
                 C9,3.1,8.3,1.23,7.68,0l0.06,0.02L7.72,0c5.55,2.55,10.29,6.07,10.29,12.86C18.01,20.56,9,21.24,9,26.37z"/>
      </svg>
    )
  },
  '/img/question.svg': (props) => {
    return (
      <svg alt={props.alt || defaultAlt} tabIndex="-1" focusable="false" viewBox="0 0 30.86 36.84">
        <path d="M15.43,34.25C6.91,34.25,0,27.34,0,18.82C0,10.3,6.91,3.39,15.43,3.39s15.43,6.91,15.43,15.43
                 C30.87,27.34,23.95,34.25,15.43,34.25z M15.84,8.53c-3.28,0-5.73,1.41-7.46,4.28c-0.18,0.28-0.1,0.64,0.16,0.84l2.65,2.01
                 c0.1,0.08,0.24,0.12,0.38,0.12c0.18,0,0.38-0.08,0.5-0.24c0.94-1.21,1.35-1.57,1.73-1.85c0.34-0.24,1-0.48,1.73-0.48
                 c1.29,0,2.47,0.82,2.47,1.71c0,1.04-0.54,1.57-1.77,2.13c-1.43,0.64-3.38,2.31-3.38,4.26v0.72c0,0.36,0.28,0.64,0.64,0.64h3.86
                 c0.36,0,0.64-0.28,0.64-0.64c0-0.46,0.58-1.45,1.53-1.99c1.53-0.87,3.62-2.03,3.62-5.08C23.15,11.28,19.29,8.53,15.84,8.53z
                 M18.01,24.61c0-0.36-0.28-0.64-0.64-0.64H13.5c-0.36,0-0.64,0.28-0.64,0.64v3.86c0,0.36,0.28,0.64,0.64,0.64h3.86
                 c0.36,0,0.64-0.28,0.64-0.64V24.61z"/>
      </svg>
    )
  },
  '/img/eye.svg': (props) => {
    return (
      <svg alt={props.alt || defaultAlt} tabIndex="-1" focusable="false" viewBox="0 0 36 36.84" enableBackground="new 0 0 36 36.84">
        <path d="M35.61,21.49c-3.7,6.09-10.47,10.19-17.6,10.19S4.1,27.56,0.4,21.49C0.16,21.07,0,20.61,0,20.11
                 c0-0.5,0.16-0.96,0.4-1.39c3.7-6.07,10.47-10.19,17.6-10.19s13.91,4.12,17.6,10.19c0.24,0.42,0.4,0.88,0.4,1.39
                 C36.01,20.61,35.85,21.07,35.61,21.49z M25.78,13.01c0.8,1.37,1.23,2.93,1.23,4.52c0,4.96-4.04,9-9,9s-9-4.04-9-9
                 c0-1.59,0.42-3.16,1.23-4.52c-3.13,1.61-5.75,4.14-7.66,7.09c3.44,5.3,8.98,9,15.43,9s12-3.7,15.43-9
                 C31.53,17.15,28.92,14.62,25.78,13.01z M18.01,11.42c-3.36,0-6.11,2.75-6.11,6.11c0,0.52,0.44,0.96,0.96,0.96s0.96-0.44,0.96-0.96
                 c0-2.29,1.89-4.18,4.18-4.18c0.52,0,0.96-0.44,0.96-0.96C18.97,11.87,18.53,11.42,18.01,11.42z"/>
      </svg>
    )
  },
  '/img/female.svg': (props) => {
    return (
      <svg alt={props.alt || defaultAlt} tabIndex="-1" focusable="false" viewBox="0 0 50.81 79.19">
        <path d="M50.81,25.4C50.81,11.37,39.43,0,25.4,0S0,11.37,0,25.4c0,12.32,8.77,22.59,20.4,24.91v9.09h-9.79v10h9.79v9.79
                 h10V69.4h9.79v-10H30.4v-9.09C42.04,47.99,50.81,37.72,50.81,25.4z M10,25.4C10,16.91,16.91,10,25.4,10s15.4,6.91,15.4,15.4
                 s-6.91,15.4-15.4,15.4S10,33.9,10,25.4z"/>
      </svg>
    )
  },
  '/img/male.svg': (props) => {
    return (
      <svg alt={props.alt || defaultAlt} tabIndex="-1" focusable="false" viewBox="-10 -10 80 80">
        <path d="M62.77,0.12V0H37.69v10h8.64l-6.4,6.4c-4.35-3.04-9.43-4.56-14.52-4.56c-6.5,0-13,2.48-17.96,7.44
                 c-9.92,9.92-9.92,26.01,0,35.93c4.96,4.96,11.46,7.44,17.96,7.44c6.5,0,13-2.48,17.96-7.44c8.58-8.58,9.73-21.76,3.48-31.58
                 l6.05-6.05v7.64h10V0.12H62.77z M36.3,48.14c-2.91,2.91-6.78,4.51-10.89,4.51c-4.11,0-7.98-1.6-10.89-4.51
                 C11.6,45.23,10,41.36,10,37.24c0-4.11,1.6-7.98,4.51-10.89s6.78-4.51,10.89-4.51c4.11,0,7.98,1.6,10.89,4.51s4.51,6.78,4.51,10.89
                 C40.81,41.36,39.21,45.23,36.3,48.14z"/>
      </svg>
    )
  },
  '/img/neighbor-icon.svg': (props) => {
    return (
      <svg alt={props.alt || defaultAlt} tabIndex="-1" focusable="false" viewBox="0 0 74.94 28.35">
        <path d="M30.54,9.79V0.78c0-0.4-0.31-0.71-0.71-0.71h-4.24c-0.4,0-0.71,0.31-0.71,0.71v4.31l-5.39-4.51
                 c-0.93-0.77-2.43-0.77-3.36,0L0.25,13.82c-0.29,0.24-0.33,0.71-0.09,0.99l1.37,1.64c0.11,0.13,0.29,0.22,0.46,0.24
                 c0.2,0.02,0.38-0.05,0.53-0.16L17.81,3.78L33.1,16.53c0.13,0.11,0.29,0.16,0.46,0.16c0.02,0,0.04,0,0.07,0
                 c0.18-0.02,0.35-0.11,0.46-0.24l1.37-1.64c0.24-0.29,0.2-0.75-0.09-0.99L30.54,9.79z"/>
        <path d="M17.81,5.73L5.11,16.2c0,0.05-0.02,0.09-0.02,0.13v10.61c0,0.77,0.64,1.41,1.41,1.41h8.49v-8.49h5.66v8.49
                 h8.49c0.77,0,1.41-0.64,1.41-1.41V16.33c0-0.04,0-0.09-0.02-0.13L17.81,5.73z"/>
        <path d="M57.12,5.73L44.42,16.2c0,0.05-0.02,0.09-0.02,0.13v10.61c0,0.77,0.64,1.41,1.41,1.41h8.49v-8.49h5.66v8.49
                 h8.49c0.77,0,1.41-0.64,1.41-1.41V16.33c0-0.04,0-0.09-0.02-0.13L57.12,5.73z"/>
        <path d="M74.69,13.82l-4.84-4.02V0.78c0-0.4-0.31-0.71-0.71-0.71H64.9c-0.4,0-0.71,0.31-0.71,0.71v4.31L58.8,0.58
                 c-0.93-0.77-2.43-0.77-3.36,0L39.56,13.82c-0.29,0.24-0.33,0.71-0.09,0.99l1.37,1.64c0.11,0.13,0.29,0.22,0.46,0.24
                 c0.2,0.02,0.38-0.05,0.53-0.16L57.12,3.78l15.29,12.75c0.13,0.11,0.29,0.16,0.46,0.16c0.02,0,0.04,0,0.07,0
                 c0.18-0.02,0.35-0.11,0.46-0.24l1.37-1.64C75.02,14.52,74.98,14.06,74.69,13.82z"/>
      </svg>
    )
  },
  '/img/friend-icon.svg': (props) => {
    return (
      <svg alt={props.alt || defaultAlt} tabIndex="-1" focusable="false" viewBox="0 0 44.33 34.84">
        <path d="M17.42,25.33c-1.51,0-2.97-0.15-4.35-0.4c-2.05,1.46-4.38,2.52-6.88,3.17c-0.67,0.17-1.39,0.3-2.13,0.4
                 c-0.03,0-0.05,0-0.07,0c-0.37,0-0.72-0.3-0.79-0.72c-0.1-0.47,0.22-0.77,0.49-1.09c0.97-1.09,2.05-2.05,2.89-4.11
                 C2.57,20.26,0,16.67,0,12.67C0,5.67,7.79,0,17.42,0s17.42,5.67,17.42,12.67C34.83,19.67,27.04,25.33,17.42,25.33z M37.75,28.92
                 c0.84,2.05,1.93,3.02,2.89,4.11c0.27,0.32,0.59,0.62,0.49,1.09c-0.1,0.45-0.47,0.77-0.87,0.72c-0.74-0.1-1.46-0.22-2.13-0.4
                 c-2.5-0.64-4.82-1.71-6.88-3.17c-1.39,0.25-2.85,0.4-4.35,0.4c-4.48,0-8.59-1.24-11.68-3.27c0.72,0.05,1.46,0.1,2.18,0.1
                 c5.32,0,10.34-1.53,14.18-4.3C35.72,21.18,38,17.1,38,12.67c0-1.29-0.2-2.55-0.57-3.76c4.18,2.3,6.9,5.96,6.9,10.09
                 C44.33,23.03,41.76,26.6,37.75,28.92z"/>
      </svg>
    )
  },
  '/img/landlord-icon.svg': (props) => {
    return (
      <svg alt={props.alt || defaultAlt} tabIndex="-1" focusable="false" viewBox="0 0 29.56 37.62">
        <path d="M29.56,1.34v34.94c0,0.73-0.61,1.34-1.34,1.34H1.34C0.61,37.62,0,37.01,0,36.28V1.34C0,0.61,0.61,0,1.34,0
                 h26.87C28.95,0,29.56,0.61,29.56,1.34z M8.06,6.05c0-0.38-0.29-0.67-0.67-0.67H6.05c-0.38,0-0.67,0.29-0.67,0.67v1.34
                 c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67V6.05z M8.06,11.42c0-0.38-0.29-0.67-0.67-0.67H6.05
                 c-0.38,0-0.67,0.29-0.67,0.67v1.34c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67V11.42z M8.06,16.8
                 c0-0.38-0.29-0.67-0.67-0.67H6.05c-0.38,0-0.67,0.29-0.67,0.67v1.34c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67
                 V16.8z M8.06,22.17c0-0.38-0.29-0.67-0.67-0.67H6.05c-0.38,0-0.67,0.29-0.67,0.67v1.34c0,0.38,0.29,0.67,0.67,0.67h1.34
                 c0.38,0,0.67-0.29,0.67-0.67V22.17z M8.06,27.55c0-0.38-0.29-0.67-0.67-0.67H6.05c-0.38,0-0.67,0.29-0.67,0.67v1.34
                 c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67V27.55z M10.75,7.39c0,0.38,0.29,0.67,0.67,0.67h1.34
                 c0.38,0,0.67-0.29,0.67-0.67V6.05c0-0.38-0.29-0.67-0.67-0.67h-1.34c-0.38,0-0.67,0.29-0.67,0.67V7.39z M10.75,12.77
                 c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67v-1.34c0-0.38-0.29-0.67-0.67-0.67h-1.34c-0.38,0-0.67,0.29-0.67,0.67
                 V12.77z M10.75,18.14c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67V16.8c0-0.38-0.29-0.67-0.67-0.67h-1.34
                 c-0.38,0-0.67,0.29-0.67,0.67V18.14z M10.75,23.51c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67v-1.34
                 c0-0.38-0.29-0.67-0.67-0.67h-1.34c-0.38,0-0.67,0.29-0.67,0.67V23.51z M18.81,30.23c0-0.38-0.29-0.67-0.67-0.67h-6.72
                 c-0.38,0-0.67,0.29-0.67,0.67v4.03c0,0.38,0.29,0.67,0.67,0.67h6.72c0.38,0,0.67-0.29,0.67-0.67V30.23z M18.81,6.05
                 c0-0.38-0.29-0.67-0.67-0.67H16.8c-0.38,0-0.67,0.29-0.67,0.67v1.34c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67
                 V6.05z M18.81,11.42c0-0.38-0.29-0.67-0.67-0.67H16.8c-0.38,0-0.67,0.29-0.67,0.67v1.34c0,0.38,0.29,0.67,0.67,0.67h1.34
                 c0.38,0,0.67-0.29,0.67-0.67V11.42z M18.81,16.8c0-0.38-0.29-0.67-0.67-0.67H16.8c-0.38,0-0.67,0.29-0.67,0.67v1.34
                 c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67V16.8z M18.81,22.17c0-0.38-0.29-0.67-0.67-0.67H16.8
                 c-0.38,0-0.67,0.29-0.67,0.67v1.34c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67V22.17z M24.19,6.05
                 c0-0.38-0.29-0.67-0.67-0.67h-1.34c-0.38,0-0.67,0.29-0.67,0.67v1.34c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67
                 V6.05z M24.19,11.42c0-0.38-0.29-0.67-0.67-0.67h-1.34c-0.38,0-0.67,0.29-0.67,0.67v1.34c0,0.38,0.29,0.67,0.67,0.67h1.34
                 c0.38,0,0.67-0.29,0.67-0.67V11.42z M24.19,16.8c0-0.38-0.29-0.67-0.67-0.67h-1.34c-0.38,0-0.67,0.29-0.67,0.67v1.34
                 c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67V16.8z M24.19,22.17c0-0.38-0.29-0.67-0.67-0.67h-1.34
                 c-0.38,0-0.67,0.29-0.67,0.67v1.34c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67V22.17z M24.19,27.55
                 c0-0.38-0.29-0.67-0.67-0.67h-1.34c-0.38,0-0.67,0.29-0.67,0.67v1.34c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67
                 V27.55z"/>
      </svg>
    )
  },
  '/img/business-associate-icon.svg': (props) => {
    return (
      <svg alt={props.alt || defaultAlt} tabIndex="-1" focusable="false" viewBox="0 0 40.05 34.33">
        <path d="M40.05,17.88H0V9.3c0-1.97,1.61-3.58,3.58-3.58h7.87V2.15C11.44,0.96,12.4,0,13.59,0h12.87
                 c1.18,0,2.15,0.96,2.15,2.15v3.58h7.87c1.97,0,3.58,1.61,3.58,3.58V17.88z M40.05,30.75c0,1.97-1.61,3.58-3.58,3.58H3.58
                 C1.61,34.33,0,32.72,0,30.75V20.03h15.02v3.58c0,0.78,0.65,1.43,1.43,1.43h7.15c0.78,0,1.43-0.65,1.43-1.43v-3.58h15.02V30.75z
                 M25.75,5.72V2.86H14.3v2.86H25.75z M22.89,22.89h-5.72v-2.86h5.72V22.89z"/>
      </svg>
    )
  },
  '/img/other-icon.svg': (props) => {
    return (
      <svg alt={props.alt || defaultAlt} tabIndex="-1" focusable="false" viewBox="0 0 36.62 36.62">
        <path d="M18.31,36.62C8.2,36.62,0,28.42,0,18.31C0,8.2,8.2,0,18.31,0s18.31,8.2,18.31,18.31
                 C36.62,28.42,28.42,36.62,18.31,36.62z M18.79,6.1c-3.89,0-6.79,1.67-8.84,5.08c-0.21,0.33-0.12,0.76,0.19,1l3.15,2.38
                 c0.12,0.09,0.29,0.14,0.45,0.14c0.21,0,0.45-0.09,0.6-0.29c1.12-1.43,1.6-1.86,2.05-2.19c0.41-0.29,1.19-0.57,2.05-0.57
                 c1.53,0,2.93,0.98,2.93,2.03c0,1.24-0.64,1.86-2.1,2.53c-1.69,0.76-4,2.74-4,5.05v0.86c0,0.43,0.33,0.76,0.76,0.76h4.58
                 c0.43,0,0.76-0.33,0.76-0.76c0-0.55,0.69-1.72,1.81-2.36c1.81-1.03,4.29-2.41,4.29-6.03C27.46,9.37,22.89,6.1,18.79,6.1z
                 M21.36,25.17c0-0.43-0.33-0.76-0.76-0.76h-4.58c-0.43,0-0.76,0.33-0.76,0.76v4.58c0,0.43,0.33,0.76,0.76,0.76h4.58
                 c0.43,0,0.76-0.33,0.76-0.76V25.17z"/>
      </svg>
    )
  },
  '/img/checkmark.svg': (props) => {
    return (
      <svg alt={props.alt || defaultAlt} tabIndex="-1" focusable="false" viewBox="0 0 15.95 15.96" enableBackground=":new 0 0 15.95 15.96;">
        <path d="M7.98,15.96C3.57,15.96,0,12.39,0,7.98C0,3.57,3.57,0,7.98,0s7.98,3.57,7.98,7.98
                 C15.96,12.39,12.38,15.96,7.98,15.96z M13.15,5.82l-0.95-0.94c-0.12-0.12-0.29-0.2-0.47-0.2s-0.34,0.07-0.47,0.2L7.04,9.11
                 L4.69,6.76c-0.12-0.12-0.29-0.2-0.47-0.2s-0.34,0.07-0.47,0.2L2.81,7.7C2.69,7.82,2.63,8,2.63,8.17c0,0.18,0.06,0.34,0.19,0.47
                 l3.75,3.77c0.12,0.12,0.3,0.2,0.47,0.2c0.18,0,0.35-0.07,0.48-0.2l5.64-5.64c0.12-0.12,0.19-0.29,0.19-0.47
                 C13.34,6.12,13.28,5.95,13.15,5.82z"/>
      </svg>
    )
  },
  '/img/exclamation.svg': (props) => {
    return (
      <svg alt={props.alt || defaultAlt} tabIndex="-1" focusable="false" viewBox="0 0 15.95 15.95" enableBackground=":new 0 0 15.95 15.95;">
        <path d="M15.95,7.97c0,4.4-3.57,7.97-7.97,7.97S0,12.38,0,7.97S3.57,0,7.97,0S15.95,3.57,15.95,7.97z M9.47,2.93
                 c0-0.07-0.03-0.14-0.1-0.19C9.31,2.69,9.21,2.66,9.12,2.66H6.84c-0.09,0-0.19,0.03-0.25,0.08c-0.07,0.04-0.1,0.11-0.1,0.19
                 l0.18,6.45c0,0.14,0.16,0.26,0.35,0.26h1.92c0.19,0,0.34-0.11,0.35-0.26L9.47,2.93z M9.31,10.98c0-0.19-0.14-0.34-0.32-0.34H6.99
                 c-0.19,0-0.34,0.16-0.34,0.34v1.97c0,0.19,0.16,0.34,0.34,0.34h1.99c0.18,0,0.32-0.16,0.32-0.34V10.98z"/>
      </svg>
    )
  },
  '/img/submit-error.svg': (props) => {
    return (
      <svg alt={props.alt || defaultAlt} tabIndex="-1" focusable="false" viewBox="0 0 15.9 16" enableBackground=":new 0 0 15.9 16;">
        <path className="st2" d="M15.9,8c0,4.4-3.6,8-7.9,8S0,12.4,0,8s3.6-8,7.9-8S15.9,3.6,15.9,8z M9.4,3c0-0.2,0-0.3-0.3-0.3H6.8
                                 C6.5,2.7,6.5,2.8,6.5,3l0.2,6.5c0,0.1,0.2,0.3,0.4,0.3h1.9c0.2,0,0.3-0.1,0.4-0.3L9.4,3z M9.2,11c0-0.2-0.1-0.3-0.3-0.3H7
                                 c-0.2,0-0.3,0.2-0.3,0.3v2c0,0.2,0.2,0.3,0.3,0.3h2c0.2,0,0.3-0.2,0.3-0.3V11z"/>
      </svg>
    )
  },
  '/img/schoolmate.svg': (props) => {
    return (
      <svg alt={props.alt || defaultAlt} tabIndex="-1" focusable="false" viewBox="0 0 52.3 41.62">
        <path fill="" d="M51.72,14.24l-25.29,7.95c-0.09,0.02-0.16,0.02-0.23,0.02s-0.13,0-0.23-0.02l-14.72-4.65
                         c-1.29,1.02-2.19,3.5-2.37,6.55c0.86,0.5,1.42,1.4,1.42,2.46c0,1.02-0.52,1.9-1.31,2.42l1.31,9.78c0.02,0.2-0.04,0.41-0.18,0.56
                         C10,39.46,9.8,39.55,9.59,39.55H5.26c-0.2,0-0.41-0.09-0.54-0.25c-0.14-0.16-0.2-0.36-0.18-0.56l1.31-9.78
                         c-0.79-0.52-1.31-1.4-1.31-2.42c0-1.08,0.61-2.01,1.47-2.51c0.13-2.64,0.81-5.49,2.21-7.45L0.7,14.24c-0.29-0.11-0.5-0.38-0.5-0.7
                         c0-0.32,0.2-0.59,0.5-0.7L25.98,4.9c0.09-0.02,0.16-0.02,0.23-0.02s0.13,0,0.23,0.02l25.29,7.95c0.29,0.11,0.5,0.38,0.5,0.7
                         C52.22,13.86,52.02,14.13,51.72,14.24z M40.66,27.99c0.18,3.18-6.48,5.78-14.45,5.78s-14.63-2.6-14.45-5.78l0.41-7.13l12.96,4.09
                         c0.36,0.11,0.72,0.16,1.08,0.16s0.72-0.04,1.08-0.16l12.96-4.09L40.66,27.99z"/>
      </svg>
    )
  }
}
