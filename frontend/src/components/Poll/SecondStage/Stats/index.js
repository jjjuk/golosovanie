import React, { useState } from 'react'

import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

import { TooltipContext } from 'context'

import PieChart from './PieChart'

// const data = [
//   {
//     votes: 132,
//     name: 'asdasd',
//     times: [
//       {
//         time: '03:00',
//         votes: 28,
//       },
//       {
//         time: '14:30',
//         votes: 45,
//       },
//       {
//         time: '18:10',
//         votes: 59,
//       },
//     ],
//   },
//   {
//     votes: 22,
//     name: 'sweswe',
//     times: [
//       {
//         time: '14:30',
//         votes: 10,
//       },
//       {
//         time: '18:10',
//         votes: 12,
//       },
//     ],
//   },
//   {
//     votes: 92,
//     name: 'zxczxc',
//     times: [
//       {
//         time: '14:30',
//         votes: 47,
//       },
//       {
//         time: '18:10',
//         votes: 45,
//       },
//     ],
//   },
// ]

// const innerData = data.map(({ times }) => times).flat()

const Stats = ({ data, innerData }) => {
  const [title, setTitle] = useState('')
  const [open, setOpen] = useState('')

  return (
    <TooltipContext.Provider value={{ setOpen, setTitle }}>
      <Tooltip
        PopperProps={{
          id: 'popper',
          style: { display: 'flex' },
        }}
        TransitionProps={{
          id: 'tltp',
        }}
        open={open}
        title={title}
        children={<div id='tooltip' />}
      />
      <div
        style={{
          padding: '15px',
          width: '370px',
          height: '370px',
          marginBottom: '-30px',
          overflow: 'hidden'
        }}
      >
        <Typography
          style={{            
            position: 'absolute',
            textTransform: 'uppercase',
            marginTop: 160,
            marginLeft: 145,
          }}
          color='secondary'
          children={<b>stats</b>}
        />
        <PieChart
          data={innerData}
          padding={65}
          innerRadius={65}
          outerRadius={105}
          elevation={5}
          cornerRadius={6}
        />
        <PieChart
          data={data}
          padding={10}
          innerRadius={120}
          outerRadius={160}
          elevation={5}
          cornerRadius={6}
        />
      </div>
    </TooltipContext.Provider>
  )
}

export default Stats
