from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import database
from models import models
from core import hashing
from core.jwtToken import create_access_token
from datetime import timedelta
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(prefix='/auth', tags=['Authentication'])
ACCESS_TOKEN_EXPIRE_MINUTES = 30

@router.post('/login')
async def login(request: OAuth2PasswordRequestForm = Depends(), db : Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.username == request.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail = "Invalid Credentials")
    if not hashing.Hash.verify(request.password, user.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail = "Invalid Password")

    # generate a JWT and return it
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "is_superuser" : user.is_superuser}