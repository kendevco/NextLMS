## LMS Platform

This repository contains a faithful copy and enhancement of the LMS platform created by CodeWithAntonio in the tutorial Learn Next & React and get Hired!: https://www.youtube.com/watch?v=Big_aFLmekI.

**Key Features:**

* Browse and filter courses
* Purchase courses using Stripe
* Mark chapters as completed or uncompleted
* Progress calculation of each course
* Student dashboard
* Teacher mode
* Create new courses
* Create new chapters
* Easily reorder chapter position with drag and drop
* Upload thumbnails, attachments, and videos using UploadThing
* Video processing using Mux
* HLS Video player using Mux
* Rich text editor for chapter description
* Authentication using Clerk
* ORM using Prisma
* MySQL database using Planetscale

**Enhancements:**

* Added a search function to the courses page
* Improved the user interface of the student and teacher dashboards

**Planned Enhancement:**
Integrate Elliot Chong's Quizmify into this.

**Usage:**

To use this repository, you will need to have Node.js and NPM installed on your machine. Once you have installed the necessary dependencies, you can clone the repository and run the following commands:

**Deployment:**

To deploy the application to production, you will need to sign up for accounts on the following services:

Vercel https://vercel.com - for server-less hosting.

Mux https://mux.com - for Videos storage. 

Clerk https://clerk.com This is covered in the first hour or so of the video. It's the easiest 
authentication available and just works. It is so simple and easy to integrate into your app at least for 
me it is awesome. I've integrated it into my own Portfolio app https://github.com/kendevco/Portfolio https://folio.kendec.co. 

MongoDB Atlas https://mongodb.com This project has deviated from Antonio's by using MongoDb.com. I've 
found it to be much more flexible for budding NextJS developers. I've created 7 free databases there
so far and it is perfect for my needs. I had no problems modifying the schema for use with MongoDB and 
if you are looking for a project already adapted for Mongo - honestly the only changes were in the 
Schema! And Copilot did all the heavy lifting.  

UploadThing https://uploadthing.com/ for serverless upload storage.

Stripe Payments: https://stripe.com

If you need further instruction on configuring these services, they are all covered in the course
video https://www.youtube.com/watch?v=Big_aFLmekI. 

To reset the database, run 

    npx prisma migrate reset
    npx prisma db push

Note that when I ran npx prisma migrate reset against mongodb.com I ran
into errors in the terminal stating I lacked permission. However, after
running the command I did reinitialize the database. 

Note also if reinitializing the datbase you also need to run:
node scripts/seed.ts

See https://youtu.be/Big_aFLmekI?t=30748 for step-by-step