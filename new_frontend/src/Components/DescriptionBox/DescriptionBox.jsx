import React from 'react'
import './DescriptionBox.css'

export const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (150)</div>
        </div>
        <div className="descriptionbox-description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptatem dolore 
                dignissimos perspiciatis, deserunt adipisci
                ullam molestias eum. Dicta, fugiat quidem. Atque 
                architecto illo debitis animi saepe alias, voluptatum esse!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Expedita numquam eveniet dolorum recusandae dolor tempora! 
                Itaque, odio. Animi adipisci corporis obcaecati distinctio rerum. Molestiae eos tempora
                 dolorum voluptate quibusdam obcaecati.</p>
        </div>
    </div>
  )
}
