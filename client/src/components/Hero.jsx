import React from 'react'
export default function Hero({title='Luxury Watches', subtitle='Premium collections'}){
  return (
    <section className='hero'>
      <div className='hero-inner container'>
        <h1 className='hero-title'>{title}</h1>
        <p className='hero-sub'>{subtitle}</p>
      </div>
    </section>
  )
}
