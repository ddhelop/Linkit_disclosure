import React from 'react'
import MatchFilter from '../common/MatchFilter'
import InBoxMessage from './InBoxMessage'

export default function MatchInBox() {
  return (
    <div className="mt-9 flex flex-col">
      <MatchFilter />

      <div className="mt-8 flex flex-col">
        <InBoxMessage />
      </div>
    </div>
  )
}
