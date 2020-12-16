import React, { useEffect, useRef, useContext, memo } from 'react'
import * as d3 from 'd3'

import { TooltipContext } from 'context'
import { theme } from 'useStyles'

import moment from 'moment'

const Pie = (props) => {
  const { setOpen, setTitle } = useContext(TooltipContext)

  const ref = useRef(null)

  const size = (props.outerRadius + props.padding) * 2

  useEffect(() => {
    const createPie = d3
      .pie()
      .value((d) => d.votes)
      .sort(null)
    // .padAngle(0.015)

    const createArc = d3
      .arc()
      .innerRadius(props.innerRadius)
      .outerRadius(props.outerRadius)
      .cornerRadius(props.cornerRadius)
      .padAngle(0.015)
    const arcOver = d3
      .arc()
      .innerRadius(props.innerRadius + props.elevation)
      .outerRadius(props.outerRadius + props.elevation)
      .cornerRadius(props.cornerRadius)
      .padAngle(0.015)

    const colorsLength = props.data.length > 2 ? props.data.length : 3
    const colors = d3
      .scaleLinear()
      .domain([1, colorsLength])
      .interpolate(d3.interpolateHcl)
      .range([
        d3.rgb(theme.palette.primary.main),
        d3.rgb(theme.palette.secondary.main),
      ])

    const data = createPie(props.data)
    const group = d3.select(ref.current)
    const groupWithData = group.selectAll('g.arc').data(data)

    groupWithData.exit().remove()

    const groupWithUpdate = groupWithData
      .enter()
      .append('g')
      .attr('class', 'arc')

    const path = groupWithUpdate
      .append('path')
      .merge(groupWithData.select('path.arc'))

    const arcTween = (d) => {
      const interpolator = d3.interpolate(d.startAngle + 0.1, d.endAngle)
      return (t) => {
        d.endAngle = interpolator(t)
        return createArc(d)
      }
    }

    const delay = (2000 / data.length).toFixed(0)

    path
      .attr('class', 'arc')
      .attr('fill', (_, i) => colors(i))
      .transition()
      .delay((_, i) => i * delay)
      .duration(delay)
      .attrTween('d', arcTween)

    setTimeout(() => {
      path
        .attr('class', 'arc')
        .on('mouseover', (e, { data }) => {
          setOpen(true)
          data.name && setTitle(`Event "${data.name}" \nVotes: ${data.votes}`)
          data.time &&
            setTitle(
              `Time ${moment(Number(data.time)).format('HH:mm')} \nVotes: ${
                data.votes
              }`
            )
          d3.select(e.srcElement)
            .transition()
            .duration(200)
            .attr('d', arcOver)
            .style('filter', 'url(#dropshadow)')
        })
        .on('mousemove', (e) => {
          // const color = e.srcElement.attributes.fill.value
          // d3.select('#tltp').attr('style', `color: ${color} !important`)
          d3.select('#popper')
            .style('top', e.pageY - 10 + 'px')
            .style('left', e.pageX + 1510 + 'px')
        })
        .on('mouseout', (e) => {
          setOpen(false)
          d3.select('#popper')
            .style('top', e.pageY - 10 + 'px')
            .style('left', e.pageX + 310 + 'px')
          d3.select(e.srcElement)
            .transition()
            .duration(200)
            .attr('d', createArc)
            .style('filter', 'none')
        })
    }, 2200)
  }, [
    props.data,
    props.innerRadius,
    props.outerRadius,
    setOpen,
    setTitle,
    props.cornerRadius,
    props.elevation,
  ])

  return (
    <svg
      style={{ position: 'absolute', pointerEvents: 'none' }}
      width={size}
      height={size}
    >
      <defs>
        <filter id='dropshadow'>
          <feDropShadow
            dx='-0.4'
            dy='0.4'
            floodOpacity='0.2'
            stdDeviation='4'
          />
        </filter>
      </defs>
      <g
        ref={ref}
        transform={`translate(${props.outerRadius + props.padding || 0} ${
          props.outerRadius + props.padding || 0
        })`}
      />
    </svg>
  )
}

export default memo(Pie)
