from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from database.database import engine, Base
from routers import user, authentication, product, order, dashboard

app = FastAPI(
    title="Food Ez"
)

origins = ['http://localhost:3000', 'localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

Base.metadata.create_all(engine)


@app.get('/', tags=['Home'])
def home():
    return "FoodEz API - append /docs at the end of url to access documentation"


app.include_router(authentication.router)
app.include_router(dashboard.router)
app.include_router(user.router)
app.include_router(product.router)
app.include_router(order.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
