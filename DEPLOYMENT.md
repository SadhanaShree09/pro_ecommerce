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
4. Deploy the blueprint. The frontend API URL assumes the API service is named `ecomcart-api`; update `REACT_APP_API_URL` if Render assigns a different URL.
5. After the API is deployed, run `npm run seed` from the backend using the hosted `DB_URL`, or import `backend/data/products.json` into the database.

The static-site rewrite in `render.yaml` keeps React routes such as `/product/:id` working after a refresh.
