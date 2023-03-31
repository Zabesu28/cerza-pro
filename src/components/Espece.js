// import React from 'react';
// import '../styles/encyclopedie.css'

// const Espece = ({espece}) => {
//       return (
//             <div className='carte'>
//                   <img className="gridImage" src={espece.imageEspece}></img>
//                   <p className='titre'>{espece.libelleEspece}</p>
//             </div>
//       );
// };

// export default Espece;

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import '../styles/encyclopedie.css'

const Espece = ({espece}) => {
      return (
            <Card className='carte'>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={espece.imageEspece}
                  alt={espece.imageEspece}
                  className='gridImage'
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {espece.libelleEspece}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {espece.description.substring(0,150) + "..."}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
}

export default Espece;