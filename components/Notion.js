import Link from 'next/link';
import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { CardActionArea } from '@mui/material';

//UIコンポーネントの定義　
    //カードでもOK
const Notion = ({ notion }) => {
    //console.log(notion)
    return(
        <div className="">

                <Card sx={{ maxWidth: 345 }} variant="outlined">
                    <CardActionArea href={notion.url}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="/105.jpg"
                        alt="tailwind css"
                    />
                        <CardContent>
                            <Typography variant="h5" component="div">
                            {notion.title}
                            </Typography>
                            <Chip label={notion.multi_select} />
                        </CardContent>
                    </CardActionArea>
                </Card>
                {/* <span>{notion.id}</span>
                {" : "}

                    <span className="cursor-pointer text-blue-500 boder-b border-blue-500 hover:bg-gray-200">
                        {notion.title}
                    </span> */}

            <br></br>
        </div>

    )
}

export default Notion;


// <link href={`/posts/${post.id}`}>
