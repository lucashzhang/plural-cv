# PluralCV

Many people know that ideally you want to have customized Resumes for each place you apply to. But when you have dozens and dozens of places to apply to, that gets tiring quick. First you have to keep track of which CVs went where. And then you have the problem of making that many Resumes. The changes needed may be minor, but the thought that goes into it can become super tedious. The proposal is to create a Resume Builder with the ability to automatically build Resumes based on the job title and description.

### Stage 1:
Build Resume Building Site. This includes publishing and sharing resumes with at least one template option

### Stage 2:
Machine Learning Algorithm trained with [this](https://www.kaggle.com/datasets/PromptCloudHQ/us-technology-jobs-on-dicecom) dataset. This is probably a NLP multi classification problem. Just need to get around to labeling/cleaning this dataset and learning how to do the ML part :P

## Proposed Tech Stack

Decided/Mostly Decided
 - Frontend: NextJS
 - Auth: NextAuth.js + OAuth Providers
 - Backend: NextJS API Routes
 - Middleware/ORM: Prisma
 - Database: Some Postgres-like or MySQL SQL Database

Undecided
 - ML Hosting (Google Cloud ML Functions? Local?)
 - Storage Bucket for uploading PDF

Other Technologies of Note
 - Framer Motion: Super nice ReactJS animation library
 - React-Query: Allows for the database to be a pseudo model for the application with minimum effort.

The goal of this project's architecture is to be ultra portable. NextJS, Prisma, and NextAuth can be hosted by practically anything, even serverless functions. A cloud/managed Postgres (or Postgres-like such as CockroachDB) database compatible with Prisma and NextAuth is also very common.

The current plan is to host on Netlify and use something like serverless CockroachDB or PlanetScale. This plan gives this project the possibility to immediately scale up enormously without needing to reconfigure the architecture. Money is a different problem, but if no one is using it, this is should all be free too.