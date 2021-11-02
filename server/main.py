from fastapi import FastAPI
import uvicorn

from models.models import Base
from database.database import engine
from routers import user, authentication

app = FastAPI()

Base.metadata.create_all(engine)

app.include_router(authentication.router)
app.include_router(user.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)