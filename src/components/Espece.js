import React from 'react';
import '../styles/encyclopedie.css'

const Espece = ({espece}) => {
      return (
            <div className='carte'>
                  <img className="gridImage" src={espece.imageEspece}></img>
                  <p className='titre'>{espece.libelleEspece}</p>
            </div>
      );
};

export default Espece;