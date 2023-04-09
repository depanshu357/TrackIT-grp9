TrackIT
==================================

You would have seen your parents or elders keeping track of how much money they spent on monthly or yearly basis to get an idea of their monthly or yearly savings. Keeping this in mind we have made a web app to ease the hassle of keeping the record or tracking physically or manually typing the entries in excel or similar apps and then using formulas to calculate the total sum spent and all. Using the app any common person whether adult or student will be able to upload their entry on the web app and get the analytics of how much amount they spent and on what like Food, Travel, Groceries, Shopping, etc. monthly.

 One of the other benefits of this app would be that the person can access it from any device as it’s a web app and will save time in making entries and keeping records. They won’t have to keep saving the receipts or tickets for their purchases. They would be able to directly enter it. We hope that TrackIt will help most people in keeping a track of their spending.


## How to run the software?

* Make sure you have node installed in your system

open the terminal in backend folder and run

`npm install --legacy-peer-deps`
`node server.js`

in the backend folder make file name ".env" and copy paste this info - 

PORT=4000
MONGO_URI=mongodb+srv://depanshusahu057:pOTGR16YkmqgfvMy@cluster0.drjcmse.mongodb.net/?retryWrites=true&w=majority
SECRET=madebyinnocentandintrovert

now open terminal in frontend folder and run

`npm install --legacy-peer-deps`
`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the consol
