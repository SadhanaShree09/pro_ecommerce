# Ecomcart deployment

## Local development

1. Start MongoDB locally.
2. In `backend`, run `npm run seed` once to load the catalogue.
3. Run `npm start` in `backend` and `npm start` in `frontend`.

The API runs on `http://localhost:8000`; the React app runs on `http://localhost:3000`.

## Render

The root `render.yaml` defines one Node web service and one static React site.

1. Push the repository to GitHub.
2. In Render, choose **New > Blueprint** and select the repository.
3. Set the `DB_URL` secret on `ecomcart-api` to a hosted MongoDB connection string, such as MongoDB Atlas. Do not commit credentials.
4. Deploy the blueprint. Copy the actual public URL shown for `ecomcart-api` in Render and verify `<api-url>/api/v1/health` returns JSON before deploying the frontend. The service name does not guarantee that its public URL is `https://ecomcart-api.onrender.com`.
5. After the API is deployed, run `npm run seed` from the backend using the hosted `DB_URL`, or import `backend/data/products.json` into the database.

## Vercel frontend

The React app reads `REACT_APP_API_URL` when the production build is created. In the Vercel project settings, add this environment variable for the **Production** environment:

```
REACT_APP_API_URL=https://<your-render-api-url>/api/v1
```

Then redeploy the frontend. Do not use `localhost` for this value. If the API health URL does not return `{ "success": true, ... }`, fix or redeploy the Render backend first. The backend also needs a hosted MongoDB `DB_URL`; the local MongoDB value in `backend/config/config.env` cannot work on Render.

The static-site rewrite in `render.yaml` keeps React routes such as `/product/:id` working after a refresh.

## Vercel backend

The backend can also be deployed as a Vercel serverless project:

1. Create a second Vercel project from the same GitHub repository.
2. Set **Root Directory** to `backend`.
3. Set the framework preset to **Other**.
4. Add this environment variable in Vercel for Production:

```
DB_URL=your_mongodb_atlas_connection_string
NODE_ENV=production
```

5. Deploy the project. Vercel will use `backend/api/[...path].js` to forward API requests to Express.
6. Test `https://<backend-project>.vercel.app/api/v1/health`.
7. In the frontend Vercel project, set `REACT_APP_API_URL` to `https://<backend-project>.vercel.app/api/v1`, then redeploy the frontend.

Use MongoDB Atlas or another hosted MongoDB database. The local MongoDB URL in `backend/config/config.env` cannot be used by Vercel.
