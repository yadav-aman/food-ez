from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from models.models import Base
from database.database import engine
from routers import user, authentication

app = FastAPI()

origins = ['http://localhost:3000','localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']    
)

Base.metadata.create_all(engine)

app.include_router(authentication.router)
app.include_router(user.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)