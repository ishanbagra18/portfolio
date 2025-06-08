//  this will the main file 

// make the "type": module so that we can do import _____ from ______ otherwise we can't do this

import {app} from "./app.js"   //extension to be written

app.listen(process.env.PORT , () =>
{
    console.log(`Server is listening on port ${process.env.PORT}`);
});





